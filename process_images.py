import os
import ssl
import urllib.request
from PIL import Image, ImageFilter, ImageDraw

output_dir = '/Users/kastet/work/guess/assets/images'
os.makedirs(output_dir, exist_ok=True)

# Ignore SSL verification for Mac Python urllib
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

urls = {
    "1": ("https://cdn.27.ua/sc--media--prod/default/a6/cb/f9/a6cbf99b-8389-497c-8b19-916477107dfb.jpg", "item_1_screw_extractor.jpg"),
    "2": ("https://images.prom.ua/2080941502_w640_h640_kabel-sata-uglovoj.jpg", "item_2_sata_cable.jpg"),
    "3": ("https://thumbs.dreamstime.com/b/bicycle-tube-presta-valve-white-background-45689510.jpg", "item_3_presta_valve.jpg"),
    "4": ("https://images.prom.ua/7019307587_w640_h640_klyuch-sekretka-dlya-koles.jpg", "item_4_wheel_lock.jpg"),
    "5": ("https://www.rcscomponents.kiev.ua/img/kanifol-sosnovaya-20g.jpg", "item_5_kanifol_raw.jpg"),
    "6": ("https://server-shop.ua/assets/images/resources/18808/5efc8240636a3de118843a4937d75f35829c038f.png", "item_6_m2_ssd.png"),
    "7": ("https://bike-bc.com.ua/content/images/36/1410x1048l80mc0/42360913915655.jpeg", "item_7_tire_levers.jpeg"),
    "8": ("https://images.prom.ua/6895700377_w640_h640_nabor-dlya-narezaniya.jpg", "item_8_tap_die.jpg"),
    "9": ("https://ae-pic-a1.aliexpress-media.com/kf/S349688bb66124d98b231e4977ce0ee62d.jpg", "item_9_cmos_jumper.jpg"),
    "10": ("https://www.waragod.com.ua/cdn/shop/files/dragowa-tactical-vreckova-retazova-pila-s-paracordovou-rukovatou-wander-zelena-47017.jpg", "item_10_pocket_saw.jpg"),
    "11": ("https://ride.lezyne.com/cdn/shop/products/1-MT-CHANGUE-V106_ChainGauge_v3-front_R1.jpg?v=1751351227&width=3840", "item_11_chain_gauge_raw.jpg"),
}

for key, (url, filename) in urls.items():
    filepath = os.path.join(output_dir, filename)
    print(f"Downloading {key}: {filename}...")
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, context=ctx) as resp, open(filepath, 'wb') as f:
            f.write(resp.read())
        print(f"Downloaded {filename}")
    except Exception as e:
        print(f"Error downloading {filename}: {e}")

# Process Item 5 (Kanifol): Blur text on left portion of the image/label so text cannot be read
kanifol_raw_path = os.path.join(output_dir, "item_5_kanifol_raw.jpg")
if os.path.exists(kanifol_raw_path):
    img = Image.open(kanifol_raw_path).convert("RGB")
    width, height = img.size
    # Heavy blur on left portion where text label appears
    left_box = (0, 0, int(width * 0.55), height)
    left_crop = img.crop(left_box)
    blurred_left = left_crop.filter(ImageFilter.GaussianBlur(radius=20))
    img.paste(blurred_left, left_box)
    img.save(os.path.join(output_dir, "item_5_kanifol.jpg"))
    print("Processed item 5: kanifol blurred text successfully")

# Process Item 11 (Chain gauge): Blur/censor text engraved on tool
gauge_raw_path = os.path.join(output_dir, "item_11_chain_gauge_raw.jpg")
if os.path.exists(gauge_raw_path):
    img = Image.open(gauge_raw_path).convert("RGB")
    width, height = img.size
    # Blur central area where text and numbers are printed on the tool
    text_box = (int(width * 0.15), int(height * 0.35), int(width * 0.85), int(height * 0.65))
    crop_area = img.crop(text_box)
    blurred_area = crop_area.filter(ImageFilter.GaussianBlur(radius=25))
    img.paste(blurred_area, text_box)
    img.save(os.path.join(output_dir, "item_11_chain_gauge.jpg"))
    print("Processed item 11: chain gauge text blurred successfully")

print("All downloads and processing completed.")
