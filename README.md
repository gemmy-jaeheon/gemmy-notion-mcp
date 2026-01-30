# gemmy-notion-mcp

Notion API MCP 서버. Claude Code에서 Notion 페이지/블록/DB 조작.

> Based on [awkoy/notion-mcp-server](https://github.com/awkoy/notion-mcp-server) (MIT)

## 설치

`.mcp.json`:

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "github:gemmy-jaeheon/gemmy-notion-mcp"],
      "env": {
        "NOTION_TOKEN": "ntn_YOUR_TOKEN",
        "NOTION_PAGE_ID": "YOUR_PAGE_ID"
      }
    }
  }
}
```

## 공식 MCP vs 이 Fork

| 기능 | 공식 (@notionhq) | 이 Fork |
|------|:---:|:---:|
| 블록 CRUD | ✅ | ✅ |
| 데이터베이스 | ✅ | ✅ |
| 코멘트/유저 | ✅ | ✅ |
| **배치 작업** | ❌ | ✅ |
| **부분 실패 처리** | ❌ | ✅ |
| Windows 호환 | ⚠️ | ✅ |

## 기능

### 블록 (notion_blocks)

| Action | 설명 |
|--------|------|
| `append_block_children` | 블록 추가 |
| `retrieve_block` | 블록 조회 |
| `retrieve_block_children` | 하위 블록 조회 |
| `update_block` | 블록 수정 |
| `delete_block` | 블록 삭제 |
| `batch_append_block_children` | **여러 블록 한번에 추가** |
| `batch_update_blocks` | **여러 블록 한번에 수정** |
| `batch_delete_blocks` | **여러 블록 한번에 삭제** |
| `batch_mixed_operations` | **추가/수정/삭제 혼합** |

**지원 블록:** paragraph, heading, callout, quote, toggle, bulleted_list, numbered_list, to_do, code, divider, image

### 페이지 (notion_pages)

`create_page`, `update_page_properties`, `archive_page`, `restore_page`, `search_pages`

### 데이터베이스 (notion_database)

`create_database`, `query_database`, `update_database`

### 코멘트 (notion_comments)

`get_comments`, `add_page_comment`, `add_discussion_comment`

### 유저 (notion_users)

`list_users`, `get_user`, `get_bot_user`

## 사용 예시

```
"이 페이지에 체크리스트 3개 추가해줘"
"테스트 DB에서 Status가 Todo인 항목만 조회"
"회의록 페이지 만들고 콜아웃으로 요약 넣어줘"
```
