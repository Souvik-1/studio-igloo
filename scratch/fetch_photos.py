import os
import sys
import json
import urllib.request
from PIL import Image
import io

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_IMAGES_DIR = os.path.join(BASE_DIR, 'public', 'images')
DATA_JSON_PATH = os.path.join(BASE_DIR, 'src', 'data', 'photos.json')
PROVENANCE_MD_PATH = os.path.join(BASE_DIR, 'PHOTO_SOURCES.md')

PHOTOS_SPEC = [
    # 8 Wedding
    {"id": "wedding-001", "category": "Wedding", "folder": "weddings", "photo_id": "1519741497674-611481863552", "photographer": "Nataniel Egosi", "alt": "Bride and groom sharing a quiet moment outdoors after ceremony", "featured": True},
    {"id": "wedding-002", "category": "Wedding", "folder": "weddings", "photo_id": "1583939003579-730e3918a45a", "photographer": "Sandy Millar", "alt": "Elegant wedding table arrangement with warm candlelight", "featured": True},
    {"id": "wedding-003", "category": "Wedding", "folder": "weddings", "photo_id": "1511285560929-80b456fea0bc", "photographer": "Alvin Mahmudov", "alt": "Bride holding a delicate bouquet of white roses and eucalyptus", "featured": False},
    {"id": "wedding-004", "category": "Wedding", "folder": "weddings", "photo_id": "1520854221256-17451cc331bf", "photographer": "Jeremy Wong", "alt": "Couple dancing under golden evening string lights", "featured": True},
    {"id": "wedding-005", "category": "Wedding", "folder": "weddings", "photo_id": "1465495976277-4387d4b0b4c6", "photographer": "Olivia Snow", "alt": "Bride walking down the aisle in soft natural sunlight", "featured": False},
    {"id": "wedding-006", "category": "Wedding", "folder": "weddings", "photo_id": "1532712938310-34cb3982ef74", "photographer": "Nathan Dumlao", "alt": "Groom adjusting cuff links before the wedding ceremony", "featured": False},
    {"id": "wedding-007", "category": "Wedding", "folder": "weddings", "photo_id": "1469371670807-013ccf25f16a", "photographer": "Samantha Lockey", "alt": "Candid emotional laugh between bride and groom", "featured": True},
    {"id": "wedding-008", "category": "Wedding", "folder": "weddings", "photo_id": "1519225421980-715cb0215aed", "photographer": "Wyatt Ryan", "alt": "Outdoor wedding arch decorated with wild floral greens", "featured": False},

    # 7 Birthday / Celebration
    {"id": "birthday-001", "category": "Birthday", "folder": "birthdays", "photo_id": "1530103862676-de8c9debad1d", "photographer": "Adi Goldstein", "alt": "Colorful celebration balloons softly floating in natural morning light", "featured": True},
    {"id": "birthday-002", "category": "Birthday", "folder": "birthdays", "photo_id": "1558636508-e0db3814bd1d", "photographer": "Joseph Gonzalez", "alt": "Handcrafted birthday cake topped with flickering birthday sparklers", "featured": False},
    {"id": "birthday-003", "category": "Birthday", "folder": "birthdays", "photo_id": "1464349095431-e9a21285b5f3", "photographer": "Brooke Lark", "alt": "Joyful toast with champagne flutes during an evening party", "featured": False},
    {"id": "birthday-004", "category": "Birthday", "folder": "birthdays", "photo_id": "1513151233558-d860c5398176", "photographer": "Jason Leung", "alt": "Festive party confetti falling around laughing guests", "featured": True},
    {"id": "birthday-005", "category": "Birthday", "folder": "birthdays", "photo_id": "1527529482837-4698179dc6ce", "photographer": "Kaftan Media", "alt": "Intimate dinner party surrounded by warm pendant lighting", "featured": False},
    {"id": "birthday-006", "category": "Birthday", "folder": "birthdays", "photo_id": "1514525253161-7a46d19cd819", "photographer": "Samantha Warren", "alt": "Group of friends celebrating around a rustic wooden table", "featured": False},
    {"id": "birthday-007", "category": "Birthday", "folder": "birthdays", "photo_id": "1492684223066-81342ee5ff30", "photographer": "Lee Blanchette", "alt": "Outdoor garden party decorated with fairy lights", "featured": False},

    # 6 Anniversary / Couple
    {"id": "couple-001", "category": "Couple", "folder": "anniversaries", "photo_id": "1516589178581-6cd7833ae3b2", "photographer": "Everton Vila", "alt": "Couple embracing warmly during sunset on a grassy hilltop", "featured": True},
    {"id": "couple-002", "category": "Couple", "folder": "anniversaries", "photo_id": "1488426862026-3ee34a7d66df", "photographer": "Christopher Campbell", "alt": "Candid couple walking hand-in-hand along a peaceful shore", "featured": False},
    {"id": "couple-003", "category": "Couple", "folder": "anniversaries", "photo_id": "1522673607200-164d1b6ce486", "photographer": "Clarisse Meyer", "alt": "Intimate profile shadow of couple sharing a smile", "featured": True},
    {"id": "couple-004", "category": "Couple", "folder": "anniversaries", "photo_id": "1529156069898-49953e39b3ac", "photographer": "Carly Rae Hobbins", "alt": "Young couple sharing coffee together in an earthy minimalist cafe", "featured": False},
    {"id": "couple-005", "category": "Couple", "folder": "anniversaries", "photo_id": "1518199266791-5375a83190b7", "photographer": "Scott Webb", "alt": "Couple leaning together under a warm sweater outdoors", "featured": False},
    {"id": "couple-006", "category": "Couple", "folder": "anniversaries", "photo_id": "1494774157365-9e04c6720e47", "photographer": "Vince Fleming", "alt": "Cinematic silhouette of couple standing under starry sky", "featured": False},

    # 6 Portrait
    {"id": "portrait-001", "category": "Portrait", "folder": "portraits", "photo_id": "1534528741775-53994a69daeb", "photographer": "Averie Woodard", "alt": "Natural light portrait of a woman with gentle expression", "featured": True},
    {"id": "portrait-002", "category": "Portrait", "folder": "portraits", "photo_id": "1507003211169-0a1dd7228f2d", "photographer": "Joseph Gonzalez", "alt": "Editorial studio portrait of a man looking thoughtfully into camera", "featured": True},
    {"id": "portrait-003", "category": "Portrait", "folder": "portraits", "photo_id": "1500648767791-00dcc994a43e", "photographer": "Jonas Kakaroto", "alt": "Outdoor portrait with soft golden hour backlighting", "featured": False},
    {"id": "portrait-004", "category": "Portrait", "folder": "portraits", "photo_id": "1494790108377-be9c29b29330", "photographer": "Michael Dam", "alt": "Close-up portrait featuring striking natural lighting", "featured": False},
    {"id": "portrait-005", "category": "Portrait", "folder": "portraits", "photo_id": "1539571696357-5a69c17a67c6", "photographer": "Logan Weaver", "alt": "Monochrome high-contrast artistic portrait", "featured": False},
    {"id": "portrait-006", "category": "Portrait", "folder": "portraits", "photo_id": "1517841905240-472988babdf9", "photographer": "Brooke Cagle", "alt": "Candid street portrait of a smiling woman in soft jacket", "featured": False},

    # 5 Family / Lifestyle
    {"id": "family-001", "category": "Family", "folder": "family", "photo_id": "1511895426328-dc8714191300", "photographer": "Tyler Nix", "alt": "Parents playing with young child on a sandy beach", "featured": False},
    {"id": "family-002", "category": "Family", "folder": "family", "photo_id": "1522071820081-009f0129c71c", "photographer": "Seth Doyle", "alt": "Warm family portrait relaxing together in a sunlit meadow", "featured": True},
    {"id": "family-003", "category": "Family", "folder": "family", "photo_id": "1542037104857-ffbb0b9155fb", "photographer": "Guilherme Rossi", "alt": "Mother holding child with candid smile", "featured": False},
    {"id": "family-004", "category": "Family", "folder": "family", "photo_id": "1502086223501-7ea6ecd79368", "photographer": "Paige Cody", "alt": "Generations sitting together in a cozy indoor setting", "featured": False},
    {"id": "family-005", "category": "Family", "folder": "family", "photo_id": "1491438590914-bc09fcaaf77a", "photographer": "Hian Oliveira", "alt": "Lively family picnic on a clear afternoon", "featured": False},

    # 5 Events
    {"id": "events-001", "category": "Events", "folder": "events", "photo_id": "1511578314322-379afb476865", "photographer": "Stem List", "alt": "Atmospheric event hall illuminated by warm ambient stage lights", "featured": True},
    {"id": "events-002", "category": "Events", "folder": "events", "photo_id": "1475721027785-f74eccf877e2", "photographer": "Headway", "alt": "Keynote speaker addressing an attentive audience", "featured": False},
    {"id": "events-003", "category": "Events", "folder": "events", "photo_id": "1464366400600-7168b8af9bc3", "photographer": "Alayna McNally", "alt": "Gala dinner tables prepared with elegant glass dinnerware", "featured": False},
    {"id": "events-004", "category": "Events", "folder": "events", "photo_id": "1501281668745-f7f57925c3b4", "photographer": "Katy Belcher", "alt": "Live musical performance with dramatic stage backlight", "featured": False},
    {"id": "events-005", "category": "Events", "folder": "events", "photo_id": "1540575467063-178a50c2df87", "photographer": "Alexandre Pellaes", "alt": "Interactive creative workshop with participants sharing ideas", "featured": False},

    # 5 Nature / Travel / Lifestyle
    {"id": "nature-001", "category": "Nature", "folder": "nature", "photo_id": "1470071459604-3b5ec3a7fe05", "photographer": "Vigneslagh", "alt": "Serene misty mountain lake shrouded in morning fog", "featured": True},
    {"id": "nature-002", "category": "Nature", "folder": "nature", "photo_id": "1441974231531-c6227db76b6e", "photographer": "Sebastian Unrau", "alt": "Sunbeams streaming through tall pine trees in a quiet forest", "featured": False},
    {"id": "nature-003", "category": "Nature", "folder": "nature", "photo_id": "1506744038136-46273834b3fb", "photographer": "Bailey Zindel", "alt": "Rolling green hills under dramatic sunset clouds", "featured": False},
    {"id": "nature-004", "category": "Nature", "folder": "nature", "photo_id": "1507525428034-b723cf961d3e", "photographer": "Sean Oulashin", "alt": "Calm ocean waves crashing on an untouched sandy shoreline", "featured": False},
    {"id": "nature-005", "category": "Nature", "folder": "nature", "photo_id": "1519681393784-d120267933ba", "photographer": "Benjamin Voros", "alt": "Snowcapped alpine peaks glowing under twilight starscape", "featured": True},

    # 4 Behind the Scenes / Photographer
    {"id": "bts-001", "category": "Behind the Scenes", "folder": "behind-the-scenes", "photo_id": "1554048612-b6a482bc67e5", "photographer": "Alexander Dummer", "alt": "Photographer holding vintage camera framing a shot", "featured": True},
    {"id": "bts-002", "category": "Behind the Scenes", "folder": "behind-the-scenes", "photo_id": "1516035069371-29a1b244cc32", "photographer": "Jakob Owens", "alt": "Camera gear neatly organized on a wooden studio surface", "featured": False},
    {"id": "bts-003", "category": "Behind the Scenes", "folder": "behind-the-scenes", "photo_id": "1452587925148-ce544e77e70d", "photographer": "REVOLT", "alt": "Photographer adjusting camera lens setting in golden light", "featured": False},
    {"id": "bts-004", "category": "Behind the Scenes", "folder": "behind-the-scenes", "photo_id": "1520390138845-fd2d229dd553", "photographer": "Levente Juhasz", "alt": "Photographer working at darkroom editing desk with printed proofs", "featured": False},

    # 4 Studio / Editorial / Creative
    {"id": "studio-001", "category": "Studio", "folder": "studio", "photo_id": "1509631179647-0177331693ae", "photographer": "Hassan Ouajbir", "alt": "High-fashion minimalist studio portrait with harsh shadow geometry", "featured": True},
    {"id": "studio-002", "category": "Studio", "folder": "studio", "photo_id": "1490481651871-ab68de25d43d", "photographer": "Content Pixie", "alt": "Minimalist architectural composition with soft shadow play", "featured": False},
    {"id": "studio-003", "category": "Studio", "folder": "studio", "photo_id": "1515886657613-9f3515b0c78f", "photographer": "Dom Hill", "alt": "Editorial model pose with vibrant warm studio backdrop", "featured": False},
    {"id": "studio-004", "category": "Studio", "folder": "studio", "photo_id": "1534447677768-be436bb09401", "photographer": "Eberhard Grossgasteiger", "alt": "Abstract shadow and light play on textured warm concrete wall", "featured": False}
]

def main():
    print(f"Starting download and processing of {len(PHOTOS_SPEC)} photos...")
    os.makedirs(os.path.join(BASE_DIR, 'public', 'images'), exist_ok=True)
    os.makedirs(os.path.join(BASE_DIR, 'src', 'data'), exist_ok=True)
    
    processed_photos = []
    provenance_lines = [
        "# Studio Igloo — Photo Provenance & Attribution Catalog",
        "",
        "This file documents the provenance, source references, creators, and licensing terms for the 50 local demonstration photographs included in Studio Igloo.",
        "",
        "| ID | Category | Local Filename | Photographer | Source Platform | Unsplash Reference | License Notes |",
        "| --- | --- | --- | --- | --- | --- | --- |"
    ]
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }

    for idx, spec in enumerate(PHOTOS_SPEC, start=1):
        folder = spec['folder']
        cat_dir = os.path.join(PUBLIC_IMAGES_DIR, folder)
        os.makedirs(cat_dir, exist_ok=True)
        
        photo_id = spec['id']
        unsplash_id = spec['photo_id']
        photographer = spec['photographer']
        
        main_filename = f"{photo_id}.webp"
        thumb_filename = f"thumb-{photo_id}.webp"
        
        main_rel_path = f"/images/{folder}/{main_filename}"
        thumb_rel_path = f"/images/{folder}/{thumb_filename}"
        
        main_abs_path = os.path.join(cat_dir, main_filename)
        thumb_abs_path = os.path.join(cat_dir, thumb_filename)
        
        # Check if already downloaded cleanly
        if os.path.exists(main_abs_path) and os.path.exists(thumb_abs_path):
            try:
                with Image.open(main_abs_path) as existing_img:
                    orig_w, orig_h = existing_img.size
                photo_entry = {
                    "id": photo_id,
                    "category": spec['category'],
                    "src": main_rel_path,
                    "thumbnail": thumb_rel_path,
                    "alt": spec['alt'],
                    "featured": spec['featured'],
                    "order": idx,
                    "width": orig_w,
                    "height": orig_h,
                    "source": {
                        "platform": "Unsplash",
                        "photographer": photographer,
                        "sourcePage": f"https://unsplash.com/photos/{unsplash_id}",
                        "licenseNote": "Unsplash License - Free to use for commercial and non-commercial purposes"
                    }
                }
                processed_photos.append(photo_entry)
                provenance_lines.append(
                    f"| `{photo_id}` | {spec['category']} | `{main_filename}` | {photographer} | Unsplash | [photo-{unsplash_id}](https://unsplash.com/photos/{unsplash_id}) | Unsplash Free License |"
                )
                continue
            except Exception:
                pass

        download_url = f"https://images.unsplash.com/photo-{unsplash_id}?auto=format&fit=crop&w=1600&q=85"
        print(f"[{idx}/50] Downloading {photo_id} ({spec['category']}) by {photographer}...")
        
        try:
            req = urllib.request.Request(download_url, headers=headers)
            with urllib.request.urlopen(req) as resp:
                img_data = resp.read()
            
            img = Image.open(io.BytesIO(img_data))
            if img.mode != 'RGB':
                img = img.convert('RGB')
            
            orig_w, orig_h = img.size
            
            main_img = img.copy()
            if orig_w > 1600:
                new_h = int(1600 * (orig_h / orig_w))
                main_img = main_img.resize((1600, new_h), Image.Resampling.LANCZOS)
            main_img.save(main_abs_path, 'WEBP', quality=85)
            
            thumb_img = img.copy()
            if orig_w > 450:
                new_th_h = int(450 * (orig_h / orig_w))
                thumb_img = thumb_img.resize((450, new_th_h), Image.Resampling.LANCZOS)
            thumb_img.save(thumb_abs_path, 'WEBP', quality=80)
            
            photo_entry = {
                "id": photo_id,
                "category": spec['category'],
                "src": main_rel_path,
                "thumbnail": thumb_rel_path,
                "alt": spec['alt'],
                "featured": spec['featured'],
                "order": idx,
                "width": orig_w,
                "height": orig_h,
                "source": {
                    "platform": "Unsplash",
                    "photographer": photographer,
                    "sourcePage": f"https://unsplash.com/photos/{unsplash_id}",
                    "licenseNote": "Unsplash License - Free to use for commercial and non-commercial purposes"
                }
            }
            processed_photos.append(photo_entry)
            provenance_lines.append(
                f"| `{photo_id}` | {spec['category']} | `{main_filename}` | {photographer} | Unsplash | [photo-{unsplash_id}](https://unsplash.com/photos/{unsplash_id}) | Unsplash Free License |"
            )
            
        except Exception as e:
            print(f"Error downloading {photo_id}: {e}")
            photo_entry = {
                "id": photo_id,
                "category": spec['category'],
                "src": main_rel_path,
                "thumbnail": thumb_rel_path,
                "alt": spec['alt'],
                "featured": spec['featured'],
                "order": idx,
                "width": 1200,
                "height": 800,
                "source": {
                    "platform": "Unsplash",
                    "photographer": photographer,
                    "sourcePage": f"https://unsplash.com/photos/{unsplash_id}",
                    "licenseNote": "Unsplash License"
                }
            }
            processed_photos.append(photo_entry)

    gallery_data = {
        "categories": [
            "Wedding",
            "Birthday",
            "Anniversary",
            "Couple",
            "Portrait",
            "Family",
            "Events",
            "Nature",
            "Behind the Scenes",
            "Studio"
        ],
        "photos": processed_photos
    }
    
    with open(DATA_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(gallery_data, f, indent=2)
    print(f"Successfully wrote {DATA_JSON_PATH}")

    with open(PROVENANCE_MD_PATH, 'w', encoding='utf-8') as f:
        f.write("\n".join(provenance_lines) + "\n")
    print(f"Successfully wrote {PROVENANCE_MD_PATH}")

if __name__ == '__main__':
    main()
