import os
from PIL import Image, ImageFilter, ImageEnhance

images_dir = '/Users/kastet/work/guess/assets/images'
target_width = 2048  # High definition 2K/4K display ready width

image_files = [
    'item_1_screw_extractor.jpg',
    'item_2_sata_cable.jpg',
    'item_3_presta_valve.jpg',
    'item_4_wheel_lock.jpg',
    'item_5_kanifol.jpg',
    'item_6_m2_ssd.png',
    'item_7_tire_levers.jpeg',
    'item_8_tap_die.jpg',
    'item_9_cmos_jumper.jpg',
    'item_10_pocket_saw.jpg',
    'item_11_chain_gauge.jpg',
    'item_12_heat_shrink.webp',
    'item_13_brake_pads.jpg',
    'item_14_thermal_paste.jpg',
    'item_15_anchor_bolt.jpg',
    'item_16_spoke_wrench.png'
]

for filename in image_files:
    filepath = os.path.join(images_dir, filename)
    if not os.path.exists(filepath):
        print(f"File not found: {filename}")
        continue

    try:
        img = Image.open(filepath)
        w, h = img.size

        # If image is smaller than target_width, upscale with LANCZOS high quality
        scale_factor = max(target_width / float(w), 1.5)
        new_w = int(w * scale_factor)
        new_h = int(h * scale_factor)

        # Upscale using Lanczos resampler
        upscaled = img.resize((new_w, new_h), resample=Image.Resampling.LANCZOS)

        # Apply Unsharp Mask sharpening filter for crisp edges and fine details
        sharpened = upscaled.filter(ImageFilter.UnsharpMask(radius=2, percent=160, threshold=2))

        # Boost sharpness subtly
        enhancer = ImageEnhance.Sharpness(sharpened)
        enhanced = enhancer.enhance(1.4)

        # Save back in high quality
        enhanced.save(filepath, quality=95, optimize=True)
        print(f"Upscaled and sharpened {filename} to {new_w}x{new_h} (HD)")

    except Exception as e:
        print(f"Error upscaling {filename}: {e}")

print("All images upscaled to high definition 4K/2K resolution.")
