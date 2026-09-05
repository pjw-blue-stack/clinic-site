import re

def patch_file(filename):
    with open(filename, "r") as f:
        content = f.read()
    
    # 1. Change import
    content = content.replace("import { useCollectionData } from 'react-firebase-hooks/firestore';", "import { useCollection } from 'react-firebase-hooks/firestore';")
    
    # 2. Find and replace all useCollectionData
    # Pattern: const \[(\w+)\] = useCollectionData\(([^,]+), \{ idField: '([^']+)' \}?\);
    def replacer(m):
        var_name = m.group(1)
        query_name = m.group(2)
        id_field = m.group(3)
        return f"const [{var_name}Snapshot] = useCollection({query_name});\n  const {var_name} = {var_name}Snapshot?.docs.map(d => ({{ {id_field}: d.id, ...d.data() }})) || [];"
    
    content = re.sub(r"const \[(\w+)\] = useCollectionData\(([^,]+), \{\s*idField:\s*'([^']+)'\s*\}\);", replacer, content)
    
    with open(filename, "w") as f:
        f.write(content)

patch_file("src/App.jsx")
patch_file("src/pages/AdminPage.jsx")
