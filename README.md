# Notifications System for FiveM

**Description:**  
A modern and efficient notifications system for FiveM servers.

---

## Features
- *4 Default Notifications Types*
- *Optimized for minimal impact on server performance*
- *Fully Customizable*
- *Progress Bar for Duration*
- *Anti-Flood System*

## Installation
1. **Download** the script from the repository.
2. **Place** the script folder in your `resources` directory.
3. **Add** `start Notify` to your `server.cfg`.
4. **Configure** the settings in `config.lua` to suit your server's preferences.

## Example Usage

Here's an example of how to send a notification:

```lua
-- Client Site
exports["Notify"]:notify("your title", "your description", "notification type", notification_length) -- notification_length is in milliseconds

-- Server Site
TriggerClientEvent("ByteDevs:Notify", source, "your title", "your description", "notification type", notification_length) -- notification_length is in milliseconds
```

## ESX Integration
replace the function `ESX.ShowNotification` in the file `es_extended\client\functions.lua` with this function:

```lua
function ESX.ShowNotification(message, notifyType, length)

    if GetResourceState("Notify") ~= "missing" then
        return exports["Notify"]:notify("your title", message, notifyType, length)
    end

    print("[^1ERROR^7] ^5ESX Notify^7 is Missing!")
end

```

## Support
For any issues or inquiries, feel free to join our Discord community for assistance.

[Join our Discord](https://dsc.gg/bytedevs)

## Contribution
Want to improve the script or suggest new features? Submit a pull request or open an issue in the GitHub repository.
