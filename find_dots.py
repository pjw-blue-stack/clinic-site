from PIL import Image

img = Image.open('/Users/parkjeuk/.gemini/antigravity/brain/bdc89cad-668c-4687-b762-3b6fd639a8df/media__1788786212513.png').convert('RGB')
w, h = img.size

blue_pixels = []
for y in range(h):
    for x in range(w):
        r, g, b = img.getpixel((x, y))
        # Blue dot color is roughly: R < 50, G > 100, B > 200
        # The user's text is `#00A2E8`, so R~0, G~162, B~232.
        if r < 80 and g > 120 and b > 180:
            blue_pixels.append((x, y))

# Separate into top and bottom clusters
top_cluster = [p for p in blue_pixels if p[1] < h/2]
bottom_cluster = [p for p in blue_pixels if p[1] >= h/2]

if top_cluster:
    avg_x = sum(p[0] for p in top_cluster) / len(top_cluster)
    avg_y = sum(p[1] for p in top_cluster) / len(top_cluster)
    print(f"Top dot: cx={avg_x/w*100:.2f}, cy={avg_y/h*100:.2f}")

if bottom_cluster:
    avg_x = sum(p[0] for p in bottom_cluster) / len(bottom_cluster)
    avg_y = sum(p[1] for p in bottom_cluster) / len(bottom_cluster)
    print(f"Bottom dot: cx={avg_x/w*100:.2f}, cy={avg_y/h*100:.2f}")

