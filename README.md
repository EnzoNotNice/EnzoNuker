<div align="center">

# EnzoNuker

![Logo](icon.png)

**A minimalist, unthrottled server reset engine executing absolute parallel Discord API operations.**

[![License: MIT](https://img.shields.io/badge/License-MIT-0f0f0f?style=flat-square&logo=git)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/Node.js-v18%2B-0f0f0f?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Discord.js Version](https://img.shields.io/badge/discord.js-v14-0f0f0f?style=flat-square&logo=discord)](https://discord.js.org/)
[![Maintenance](https://img.shields.io/badge/Maintained-Yes-0f0f0f?style=flat-square&logo=github)](https://github.com/Enzo/EnzoNuker/graphs/commit-activity)

</div>

---

## 📷 Interface Showcase

<div align="center">

![Tool Showcase](https://i.ibb.co/5gWgdydy/image.png)

</div>

---

> [!WARNING]
> **Legal Disclaimer:** This utility is designed exclusively for server administrators to reset, clean, or test authorized guild structures. Unauthorized usage on servers where you do not possess ownership or explicit written permission is strictly prohibited and may violate Discord's Terms of Service. The developers assume no liability for misuse, bans, or legal consequences resulting from unauthorized application.

---

## ◆ Table of Contents

- [Features](#-features)
- [Technical Specifications](#-technical-specifications)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Security & Permissions](#-security--permissions)
- [Support](#-support)

---

## ✦ Features

- **Parallel Execution:** Utilizes `Promise.allSettled` for fully parallel promise resolution, ensuring maximum speed.
- **Silent Operation:** Functions as a silent remote trigger listener without unnecessary chatter.
- **Minimalist Design:** Lightweight codebase focused solely on efficiency and performance.
- **Customizable:** Easily adjustable configuration for server names, channel counts, roles, and trigger words.
- **Unthrottled Logic:** Optimized to bypass standard rate limits through aggressive parallelism.

---

## ⚙ Technical Specifications

| Component | Requirement |
| :--- | :--- |
| **Runtime** | Node.js v18+ |
| **Library** | discord.js v14 |
| **Concurrency Model** | Fully parallel (`Promise.allSettled`) |
| **Trigger Mode** | Event-based remote listener |
| **Platform** | Cross-platform (Windows, Linux, macOS) |

---

## ◈ Prerequisites

Before installation, ensure you have the following:

1. **Node.js** (Version 18 or higher) installed.
2. A **Discord Bot** created in the [Discord Developer Portal](https://discord.com/developers/applications).
3. **Bot Token** generated from the Developer Portal.
4. **Guild ID** of the target server.
5. **Permissions:** The bot must have the `Administrator` permission or specific permissions to manage channels, roles, and send messages.

---

## ✦ Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory:
   ```bash
   cd EnzoNuker
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

---

## ⚙ Configuration

### 1. Environment Variables (`.env`)

Create a `.env` file in the root directory and add your credentials:

```env
DISCORD_TOKEN=YOUR_BOT_TOKEN_HERE
GUILD_ID=YOUR_TARGET_GUILD_ID_HERE
```

### 2. Application Settings (`config.json`)

Edit `config.json` to customize the nuking behavior:

```json
{
  "serverName": "Enzo Community",
  "channelName": "enzo",
  "channelCount": 30,
  "roleName": "Enzo",
  "iconPath": "./icon.png",
  "spamMessage": "@everyone ENZO RUNS THIS SERVER! Enzo Community is here!",
  "spamCount": 5,
  "triggerWord": "enzoisthebetter"
}
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| **`serverName`** | String | The new name assigned to the server after reset. |
| **`channelName`** | String | The base name for newly created channels. |
| **`channelCount`**| Number | Number of channels to create. |
| **`roleName`** | String | The name of the new role to be created. |
| **`iconPath`** | String | Path to the server icon image file. |
| **`spamMessage`** | String | The message content to be spammed in each channel. |
| **`spamCount`** | Number | Number of times to spam the message. |
| **`triggerWord`** | String | The command phrase to initiate the process. |

---

## ◆ Usage

### Step 1: Developer Portal Setup
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Select your bot and navigate to the **Bot** tab.
3. Enable the following Privileged Gateway Intents:
   - ✅ **Message Content Intent**
   - ✅ **Server Members Intent**
4. Save changes.

### Step 2: Server Hierarchy
1. Open your Discord server settings.
2. Navigate to **Roles**.
3. Drag the bot's role to the **very top** of the hierarchy to ensure it has priority over other roles.

### Step 3: Execution
1. Start the bot:
   ```bash
   npm start
   ```
2. Wait for the bot to connect successfully.
3. In any text channel of the target server, type the configured trigger word (e.g., `enzoisthebetter`).
4. The engine will execute the reset sequence immediately.

---

## 🛡 Security & Permissions

- **Ownership Verification:** Ensure you are the owner of the server or have explicit written permission from the owner before running this tool.
- **Rate Limits:** While the tool is designed for parallel execution, excessive abuse may trigger Discord's global rate limits or result in account termination.
- **Data Safety:** This tool permanently deletes channels, roles, and messages. There is no undo function. Proceed with extreme caution.

---

## ◈ Support

For issues, feature requests, or contributions, please open an issue on the repository or contact the developer directly.

- **Developer:** Enzo
- **Repository:** [GitHub Link Placeholder]
- **Documentation:** [Link to Wiki if available]

---

<div align="center">

Made by Enzo

</div>
