import os

filepath = "/Users/parkjeuk/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidian Vault(pjw)/블로그/RAW/다한증_클리닉_치료원리와_차별점.md"

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# find the line with the hashtags to dynamically cut off
cutoff_idx = len(lines)
for i, line in enumerate(lines):
    if "# 목동 다한증 클리닉" in line:
        cutoff_idx = i + 1
        break

# Write back only up to the cutoff index
with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(lines[:cutoff_idx])

print(f"File truncated at line {cutoff_idx}.")
