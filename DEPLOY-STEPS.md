# 上線步驟（Root 手動操作）

這份文件列出把網站正式上線需要的手動步驟。工程部分（程式碼、測試、部署設定）已經備好，
以下都是「帳號層級」的動作，agent 不會、也不該替你操作。

## 1. 建立 GitHub repo 並推送（可選，但建議）

這個新專案目前只在本機 `~/workspace/personal-site`，還沒推上 GitHub。若要讓 Railway
接 GitHub 自動部署，需要先有一個遠端 repo。可以自己在 github.com 建一個新 repo（public
或 private 皆可），然後：

```bash
cd ~/workspace/personal-site
git remote add origin https://github.com/<your-username>/personal-site.git
git push -u origin main
```

（也可以請 agent 用 `~/.claude/gw-keys` 裡的 token 明確 URL push，不用 `git remote add`。）

## 2. 設定 Notion（部落格內容源）

1. 到 <https://www.notion.so/my-integrations> 建立一個新的 internal integration，取得
   **Internal Integration Token**（就是 `NOTION_TOKEN`）。
2. 在 Notion 裡建立一個新的 database（Table 檢視即可），欄位設定如下（**名稱區分大小寫，
   必須完全一致**）：

   | 欄位名稱    | 型態     | 說明                         |
   | ----------- | -------- | ---------------------------- |
   | `Title`     | Title    | 文章標題                     |
   | `Slug`      | Text     | URL slug，例如 `hello-world` |
   | `Summary`   | Text     | 列表頁顯示的摘要             |
   | `Date`      | Date     | 發布日期                     |
   | `Published` | Checkbox | 打勾才會出現在網站上         |

3. database 頁面右上角「...」→「Connections」→ 把剛剛建的 integration 加進去（不然
   API 會回 404，是最容易忘記的一步）。
4. database 網址類似 `https://www.notion.so/xxxx?v=yyyy`，網址中 32 碼那段（不含連字號
   的話要自己補上，或直接複製整段再讓程式解析）就是 `NOTION_DATABASE_ID`。
5. 之後每次要發新文章，就在這個 database 新增一列，打勾 `Published`，網站會自動抓到。

## 3. 部署到 Railway

1. 去 <https://railway.app> 用 GitHub 帳號登入建立帳號。
2. 「New Project」→「Deploy from GitHub repo」→ 選第 1 步建立的 `personal-site` repo。
   Railway 會自動偵測到 Next.js（Nixpacks），不需要額外設定；`railway.json` 已經備好
   build/start 指令。
3. 在專案的「Variables」分頁填入環境變數（對照 `.env.example`）：
   - `NOTION_TOKEN` = 第 2 步拿到的 integration token
   - `NOTION_DATABASE_ID` = 第 2 步拿到的 database ID
4. 按下 Deploy，等 build 完成。完成後 Railway 會在「Settings → Networking」給一個
   `*.up.railway.app` 的免費網址，這就是正式上線的網址。
5. （之後才要做）等買了自訂網域，可以在 Railway 的「Networking」加自訂網域，並在
   Cloudflare 設 CNAME 指過去；這次先不用做。

## 完成後

把 Railway 給的網址回報一下，之後履歷/名片上就可以貼這個連結。
