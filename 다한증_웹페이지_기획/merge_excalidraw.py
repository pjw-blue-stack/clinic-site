import json
import os
import glob

# Get all excalidraw files
files = sorted(glob.glob("0*_설계도.excalidraw"))
# Filter out any that might be named 00_
files = [f for f in files if not f.startswith("00_")]

all_elements = []
x_offset = 0

for idx, filename in enumerate(files):
    with open(filename, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    elements = data.get("elements", [])
    
    # Adjust X coordinate for every element to place columns side by side
    for el in elements:
        if "x" in el:
            el["x"] += x_offset
            
    all_elements.extend(elements)
    
    # Move offset right by 1000 pixels for the next file
    x_offset += 1000

merged_data = {
    "type": "excalidraw",
    "version": 2,
    "source": "https://excalidraw.com",
    "elements": all_elements,
    "appState": {"viewBackgroundColor": "#ffffff"}
}

with open("00_다한증_전체_설계도.excalidraw", 'w', encoding='utf-8') as f:
    json.dump(merged_data, f, ensure_ascii=False, indent=2)

print(f"Merged {len(files)} files into 00_다한증_전체_설계도.excalidraw")
