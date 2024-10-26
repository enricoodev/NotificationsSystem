RegisterNetEvent("ByteDevs:Notify")
AddEventHandler("ByteDevs:Notify", function(title, message, NotifyType, duration)
    notify(title, message, NotifyType, duration)
end)

function notify(title, message, NotifyType, duration)
    
    if type(NotifyType) ~= "string" then 
        NotifyType = Config.notificDefault 
    end
    
    SendNUIMessage({
        action = 'notify',
        title = title,
        message = message,
        type = NotifyType,
        duration = duration or Config.timerDefault,
    })
end

exports('notify', notify)
