# Gemmy Notion MCP

Notion API를 Claude Code에서 사용할 수 있게 해주는 MCP 서버.

> Based on [awkoy/notion-mcp-server](https://github.com/awkoy/notion-mcp-server) (MIT License)

## 설치

### 1. Notion Integration 생성

1. https://www.notion.so/my-integrations → "New integration"
2. 토큰 복사 (`ntn_...`)

### 2. 페이지에 Integration 연결

1. 사용할 Notion 페이지 열기
2. `...` → Connections → 생성한 Integration 추가
3. URL에서 페이지 ID 복사: `notion.so/Title-**32자리**`

### 3. .mcp.json 설정

프로젝트 루트에 `.mcp.json` 생성:

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

**지원 블록 타입:** paragraph, heading, callout, quote, toggle, bulleted_list, numbered_list, to_do, code, divider, image

### 페이지 (notion_pages)

| Action | 설명 |
|--------|------|
| `create_page` | 페이지 생성 |
| `update_page_properties` | 속성 수정 |
| `archive_page` | 아카이브 |
| `restore_page` | 복원 |
| `search_pages` | 검색 |

### 데이터베이스 (notion_database)

| Action | 설명 |
|--------|------|
| `create_database` | DB 생성 |
| `query_database` | 쿼리 (필터, 정렬) |
| `update_database` | 스키마 수정 |

### 코멘트 (notion_comments)

`get_comments`, `add_page_comment`, `add_discussion_comment`

### 유저 (notion_users)

`list_users`, `get_user`, `get_bot_user`

## 사용 예시

Claude Code에서:

```
"이 페이지에 체크리스트 3개 추가해줘"
"테스트 DB에서 Status가 Todo인 항목만 조회"
"회의록 페이지 만들고 콜아웃으로 요약 넣어줘"
```

## 개발

```bash
git clone github-work:gemmy-jaeheon/gemmy-notion-mcp.git
cd gemmy-notion-mcp
npm install
npm run build

# 테스트
NOTION_TOKEN=xxx NOTION_PAGE_ID=xxx node build/index.js
```
