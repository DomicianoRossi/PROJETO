#!/usr/bin/env python3
"""
Gera o FUNDO de uma peça com modelo de imagem (Nano Banana / Gemini). OPCIONAL.

Cópia adaptada de `meta-ads/scripts/generate_image_gemini.py` — copiada, não
referenciada, para a aula-design não quebrar se aquela skill mudar de lugar. Se o
original evoluir, esta cópia NÃO acompanha sozinha.

Uso, para o formato do carrossel:

    echo '{"prompt":"small clothing shop interior, warm light, no text, no signage"}' | \
      python3 ~/.claude/skills/aula-design/scripts/gerar_fundo.py \
        --model flash --aspect-ratio 4:5 --no-open

`flash` = Nano Banana 2 (gemini-3.1-flash-image). O `4:5` casa com 1080x1350; outro
formato estica ou corta no background-size:cover.

A chave sai de GEMINI_API_KEY, procurada no .env subindo até 10 diretórios e depois em
~/. Nunca peça a chave no chat e nunca a escreva em arquivo.

O que sai daqui é FUNDO. O número e a frase continuam entrando em HTML por cima, pelo
render.py — modelo de imagem escreve algo que parece texto, e parecer basta para enganar.
A ficha 03-design.md tem de declarar que a imagem é gerada, com modelo e prompt: cena
sintética atrás de dado real lê como registro fotográfico do fato.
"""


import sys
import json
import argparse
import subprocess
import time
from pathlib import Path
from datetime import datetime


def check_dependencies():
    """Check if required packages are installed."""
    try:
        from google import genai  # noqa: F401
        return True
    except ImportError:
        print("ERROR: google-genai SDK not installed", file=sys.stderr)
        print("", file=sys.stderr)
        print("Install with:", file=sys.stderr)
        print("    pip3 install google-genai", file=sys.stderr)
        sys.exit(3)


def load_env():
    """Load environment variables from root .env file."""
    import os
    # Walk up to find project root (where .env lives)
    current = Path.cwd().resolve()
    candidates = [current] + list(current.parents)[:10] + [Path.home()]
    for directory in candidates:
        env_path = directory / ".env"
        if env_path.exists():
            try:
                with open(env_path) as f:
                    for line in f:
                        line = line.strip()
                        if line and not line.startswith("#") and "=" in line:
                            key, value = line.split("=", 1)
                            os.environ.setdefault(key.strip(), value.strip())
                return True
            except Exception:
                continue
    return False


def load_config():
    """Load API key from environment or root .env file."""
    import os

    api_key = os.environ.get("GEMINI_API_KEY")
    if api_key:
        return api_key

    load_env()
    api_key = os.environ.get("GEMINI_API_KEY")
    if api_key:
        return api_key

    print("ERROR: GEMINI_API_KEY not found", file=sys.stderr)
    print("", file=sys.stderr)
    print("Add GEMINI_API_KEY=... to your project root .env", file=sys.stderr)
    print("Get your API key from: https://aistudio.google.com/apikey", file=sys.stderr)
    sys.exit(1)


def validate_image_path(image_path: str) -> Path:
    """Validate that an image file exists and return its Path."""
    path = Path(image_path)

    if not path.exists():
        print(f"ERROR: Image file not found: {image_path}", file=sys.stderr)
        sys.exit(1)

    supported_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.webp'}
    if path.suffix.lower() not in supported_extensions:
        print(f"ERROR: Unsupported image format: {path.suffix}", file=sys.stderr)
        print(f"Supported formats: {', '.join(supported_extensions)}", file=sys.stderr)
        sys.exit(1)

    return path


def upload_file(client, file_path: Path, timeout: int = 60):
    """Upload a file to Gemini Files API and wait for it to be processed."""
    print(f"  Uploading {file_path.name}...", file=sys.stderr)

    try:
        uploaded_file = client.files.upload(file=str(file_path))
    except Exception as e:
        print(f"ERROR: Failed to upload {file_path.name}: {e}", file=sys.stderr)
        sys.exit(2)

    start_time = time.time()
    poll_interval = 1.0
    max_poll_interval = 5.0

    while True:
        try:
            file_info = client.files.get(name=uploaded_file.name)
            state = file_info.state
        except Exception as e:
            print(f"ERROR: Failed to check file status: {e}", file=sys.stderr)
            sys.exit(2)

        if state == "ACTIVE":
            print(f"  {file_path.name} ready", file=sys.stderr)
            return file_info
        elif state == "FAILED":
            print(f"ERROR: File processing failed for {file_path.name}", file=sys.stderr)
            sys.exit(2)

        elapsed = time.time() - start_time
        if elapsed >= timeout:
            print(f"ERROR: Timeout waiting for {file_path.name} to process", file=sys.stderr)
            sys.exit(2)

        time.sleep(poll_interval)
        poll_interval = min(poll_interval * 1.5, max_poll_interval)


def generate_image(model: str, prompt: dict, api_key: str,
                   image_paths: list = None, aspect_ratio: str = None,
                   resolution: str = None) -> Path:
    """Generate image using Gemini API and return path to saved file."""
    from google import genai
    from google.genai import types

    client = genai.Client(api_key=api_key)

    prompt_text = json.dumps(prompt, indent=2)

    contents = []

    if image_paths:
        print(f"Uploading {len(image_paths)} image(s) to Gemini...", file=sys.stderr)
        for img_path in image_paths:
            uploaded_file = upload_file(client, img_path)
            contents.append(uploaded_file)

    contents.append(prompt_text)

    gen_config_kwargs = {
        'response_modalities': ['IMAGE'],
    }

    if aspect_ratio or resolution:
        image_config_kwargs = {}
        if aspect_ratio:
            image_config_kwargs['aspect_ratio'] = aspect_ratio
        if resolution:
            image_config_kwargs['image_size'] = resolution
        gen_config_kwargs['image_config'] = types.ImageConfig(**image_config_kwargs)

    print(f"Generating image with {model}...", file=sys.stderr)
    if image_paths:
        print(f"  Using {len(image_paths)} input image(s)", file=sys.stderr)
    if aspect_ratio:
        print(f"  Aspect ratio: {aspect_ratio}", file=sys.stderr)
    if resolution:
        print(f"  Resolution: {resolution}", file=sys.stderr)

    try:
        response = client.models.generate_content(
            model=model,
            contents=contents,
            config=types.GenerateContentConfig(**gen_config_kwargs),
        )
    except Exception as e:
        error_msg = str(e)
        if "API_KEY_INVALID" in error_msg or "401" in error_msg:
            print("ERROR: Invalid API key", file=sys.stderr)
            print("", file=sys.stderr)
            print("Check your API key at: https://aistudio.google.com/apikey", file=sys.stderr)
        elif "PERMISSION_DENIED" in error_msg or "403" in error_msg:
            print("ERROR: Permission denied - API key may not have access to this model", file=sys.stderr)
        elif "RESOURCE_EXHAUSTED" in error_msg or "429" in error_msg:
            print("ERROR: Rate limit exceeded - please wait and try again", file=sys.stderr)
        elif "safety" in error_msg.lower() or "blocked" in error_msg.lower():
            print("ERROR: Content was blocked by safety filters", file=sys.stderr)
            print("", file=sys.stderr)
            print("Try rephrasing your prompt to avoid potentially sensitive content.", file=sys.stderr)
        else:
            print(f"ERROR: API request failed: {e}", file=sys.stderr)
        sys.exit(2)

    if not response.candidates:
        print("ERROR: No response from API - prompt may have been blocked", file=sys.stderr)
        sys.exit(2)

    candidate = response.candidates[0]
    if candidate.content is None or candidate.content.parts is None:
        finish_reason = getattr(candidate, 'finish_reason', 'unknown')
        print(f"ERROR: No content in response (finish_reason: {finish_reason})", file=sys.stderr)
        safety = getattr(candidate, 'safety_ratings', None)
        if safety:
            print(f"Safety ratings: {safety}", file=sys.stderr)
        sys.exit(2)

    for part in candidate.content.parts:
        if hasattr(part, 'inline_data') and part.inline_data is not None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            out_dir = Path.cwd() / "generated-images"
            out_dir.mkdir(exist_ok=True)
            output_path = out_dir / f"meta_ad_draft_{timestamp}.png"

            image_data = part.inline_data.data
            if isinstance(image_data, str):
                import base64
                image_data = base64.b64decode(image_data)

            with open(output_path, 'wb') as f:
                f.write(image_data)

            return output_path

    print("ERROR: No image was generated in the response", file=sys.stderr)
    print("", file=sys.stderr)
    print("The model may have returned text instead of an image.", file=sys.stderr)
    print("Try making your prompt more specific or visual.", file=sys.stderr)
    sys.exit(2)


def open_image(image_path: Path):
    """Open image using macOS default viewer."""
    try:
        subprocess.run(['open', str(image_path)], check=True)
    except subprocess.CalledProcessError:
        print("WARNING: Could not auto-open image", file=sys.stderr)
    except FileNotFoundError:
        print("NOTE: Auto-open not available on this platform", file=sys.stderr)


def main():
    parser = argparse.ArgumentParser(
        description="Generate images using Gemini image models (draft backend)",
    )
    parser.add_argument(
        '--model', '-m',
        choices=[
            'gemini-3-pro-image', 'gemini-3.1-flash-image', 'gemini-3.1-flash-lite-image',
            'gemini-2.5-flash-image',
            'flash', 'pro', 'lite',
        ],
        default='gemini-3.1-flash-image',
        help='Model to use (default: flash / Nano Banana 2). Use "flash", "pro" or "lite" as shortcuts.'
    )
    parser.add_argument(
        '--image', '-i',
        action='append',
        dest='images',
        metavar='PATH',
        help='Input image for editing/reference (can be used multiple times, up to 14 images)'
    )
    parser.add_argument(
        '--aspect-ratio', '-a',
        choices=['1:1', '2:3', '3:2', '3:4', '4:3', '4:5', '5:4', '9:16', '16:9', '21:9'],
        help='Output aspect ratio'
    )
    parser.add_argument(
        '--resolution', '-r',
        choices=['1K', '2K', '4K'],
        help='Output resolution (2K and 4K require Pro model)'
    )
    parser.add_argument(
        '--no-open',
        action='store_true',
        help='Do not automatically open the generated image'
    )

    args = parser.parse_args()

    model = args.model
    if model == 'flash':
        model = 'gemini-3.1-flash-image'
    elif model == 'lite':
        model = 'gemini-3.1-flash-lite-image'
    elif model == 'pro':
        model = 'gemini-3-pro-image'

    if args.resolution in ['2K', '4K'] and model in ('gemini-3.1-flash-lite-image', 'gemini-2.5-flash-image'):
        print(f"WARNING: {args.resolution} resolution requires Pro model. Switching to Pro.", file=sys.stderr)
        model = 'gemini-3-pro-image'

    if args.images and len(args.images) > 14:
        print("ERROR: Maximum 14 input images allowed", file=sys.stderr)
        sys.exit(1)

    check_dependencies()

    api_key = load_config()

    image_paths = None
    if args.images:
        image_paths = [validate_image_path(img_path) for img_path in args.images]

    if sys.stdin.isatty():
        print("ERROR: No prompt provided. Pipe a JSON prompt to stdin.", file=sys.stderr)
        sys.exit(1)

    try:
        prompt_text = sys.stdin.read()
        if not prompt_text.strip():
            print("ERROR: Empty prompt provided", file=sys.stderr)
            sys.exit(1)
        prompt = json.loads(prompt_text)
    except json.JSONDecodeError as e:
        print(f"ERROR: Invalid JSON prompt: {e}", file=sys.stderr)
        sys.exit(1)

    output_path = generate_image(
        model=model,
        prompt=prompt,
        api_key=api_key,
        image_paths=image_paths,
        aspect_ratio=args.aspect_ratio,
        resolution=args.resolution
    )

    print(f"SUCCESS: Image saved to {output_path}")

    if not args.no_open:
        open_image(output_path)


if __name__ == '__main__':
    main()
