import re

def patch_file(filepath, replacements):
    with open(filepath, "r") as f:
        content = f.read()
    
    for (pattern, replacement) in replacements:
        content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        
    with open(filepath, "w") as f:
        f.write(content)

# Patch ClinicPage.jsx (Notices list rendering)
clinic_replacements = [
    (
        r'<li key=\{idx\} className="notice-item">\s*<span className="notice-title">\{notice\.tag\} \{notice\.title\}</span>\s*<span className="notice-date">\{notice\.date\}</span>\s*</li>',
        r"""<li key={idx} className="notice-item" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {notice.thumbnailUrl && <img src={notice.thumbnailUrl} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} alt="thumbnail" />}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <span className="notice-title">{notice.tag} {notice.title}</span>
                      <div className="notice-content-preview" dangerouslySetInnerHTML={{ __html: notice.content }} style={{ fontSize: '0.85rem', color: '#666', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} />
                    </div>
                    <span className="notice-date">{notice.date}</span>
                  </li>"""
    )
]
patch_file("src/pages/ClinicPage.jsx", clinic_replacements)

# Patch ColumnPage.jsx (Column cards and detail view)
column_replacements = [
    (
        r'<div className="column-card-icon">\{col\.icon\}</div>',
        r"""{col.thumbnailUrl ? (
                    <div style={{ width: '100%', height: '160px', overflow: 'hidden', borderRadius: '8px 8px 0 0', marginBottom: '15px' }}>
                       <img src={col.thumbnailUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="thumbnail" />
                    </div>
                  ) : (
                    <div className="column-card-icon">{col.icon}</div>
                  )}"""
    )
]
patch_file("src/pages/ColumnPage.jsx", column_replacements)

# Patch App.jsx (Review cards)
app_replacements = [
    (
        r'<h4 className="review-title">\{review\.title\}</h4>\s*<p className="review-content">\{review\.content\}</p>',
        r"""<h4 className="review-title">{review.title}</h4>
                          {review.thumbnailUrl && <img src={review.thumbnailUrl} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} alt="review media" />}
                          <div className="review-content" dangerouslySetInnerHTML={{ __html: review.content }} style={{ fontSize: '0.9rem', color: '#666' }} />"""
    ),
    (
        r'<h4 className="review-title" style={{[^}]+}}>\{review\.title\}</h4>\s*<p className="review-content" style={{[^}]+}}>\{review\.content\}</p>',
        r"""<h4 className="review-title" style={{ fontSize: '1.1rem', marginBottom: '10px', color: 'var(--text-main)' }}>{review.title}</h4>
                        {review.thumbnailUrl && <img src={review.thumbnailUrl} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} alt="review media" />}
                        <div className="review-content" dangerouslySetInnerHTML={{ __html: review.content }} style={{ fontSize: '0.9rem', color: 'var(--text-light)', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} />"""
    )
]
patch_file("src/App.jsx", app_replacements)

print("Patching complete!")
