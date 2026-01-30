# Gemmy Notion MCP 설정 가이드

## 1. Notion Integration 생성
1. https://www.notion.so/my-integrations 접속
2. "New integration" 클릭
3. 이름 입력 (예: "Gemmy MCP")
4. "Internal Integration Token" 복사 → `NOTION_TOKEN`

## 2. 페이지 연결
1. Notion에서 사용할 페이지 열기
2. 우측 상단 `...` → Connections → Integration 추가
3. 페이지 URL에서 ID 복사: `notion.so/PAGE_TITLE-**32자리ID**` → `NOTION_PAGE_ID`

## 3. MCP 설정
프로젝트 루트에 `.mcp.json` 생성:

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "github:gemmy-jaeheon/gemmy-notion-mcp"],
      "env": {
        "NOTION_TOKEN": "ntn_...",
        "NOTION_PAGE_ID": "32자리ID"
      }
    }
  }
}
```

## 4. 사용
Claude Code에서 Notion 관련 요청하면 자동으로 MCP 도구 사용됨.

**예시:**
- "노션에 오늘 회의록 페이지 만들어줘"
- "테스트 DB에서 Status가 Todo인 항목 조회해줘"
- "이 페이지에 체크리스트 추가해줘"

## 지원 기능
- 페이지: 생성, 수정, 검색, 아카이브
- 블록: 모든 타입 (콜아웃, 체크박스, 코드 등)
- 데이터베이스: 생성, 쿼리, 필터, 정렬
- **배치 작업**: 여러 블록 한번에 추가/수정/삭제
- 코멘트, 유저 조회
