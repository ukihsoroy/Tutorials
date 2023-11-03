from flask import Flask
from flask import request
import requests
import http.client
import json
import time
from requests_toolbelt import MultipartEncoder

app = Flask(__name__)

jwt = "eyJhbGciOiJSUzI1NiIsImtpZCI6IiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwYWFzLnBhc3Nwb3J0LmF1dGgiLCJleHAiOjE2OTkwMzQ5MzYsImlhdCI6MTY5OTAzMTI3NiwidXNlcm5hbWUiOiJzaGVuemhpeXVhbi5ob20iLCJ0eXBlIjoicGVyc29uX2FjY291bnQiLCJyZWdpb24iOiJjbiIsInRydXN0ZWQiOnRydWUsInV1aWQiOiJmMjM1NzE4ZS02OGEzLTRjNzgtYjJlYy1jMjRjMzFkYWY0YzEiLCJzaXRlIjoiYm9lIiwic2NvcGUiOiJieXRlZGFuY2UiLCJzZXF1ZW5jZSI6IkVudGVycHJpc2UgU29sdXRpb25zIiwib3JnYW5pemF0aW9uIjoiUHJvZmVzc2lvbmFsIFNlcnZpY2VzLVRlY2huaWNhbCBDZW50ZXIiLCJ3b3JrX2NvdW50cnkiOiJDSE4iLCJsb2NhdGlvbiI6IkNOIiwiYXZhdGFyX3VybCI6Imh0dHBzOi8vczEtaW1maWxlLmZlaXNodWNkbi5jb20vc3RhdGljLXJlc291cmNlL3YxL3YyXzYyYTI5NzQxLTVhYWEtNDBhNi04MTY2LTBiM2Q4MDliN2ViZ34_aW1hZ2Vfc2l6ZT1ub29wXHUwMDI2Y3V0X3R5cGU9XHUwMDI2cXVhbGl0eT1cdTAwMjZmb3JtYXQ9cG5nXHUwMDI2c3RpY2tlcl9mb3JtYXQ9LndlYnAiLCJlbWFpbCI6InNoZW56aGl5dWFuLmhvbUBieXRlZGFuY2UuY29tIiwiZW1wbG95ZWVfaWQiOjYyNTkxMTJ9.uSEzVKxcAccHymK_ckfFAPeaeuPF-X39XMwp4nBgs0IrT1Rr-9dEUxAbj_7xBKOVX-0dV5PsLZtoT6tXprbMcWrc53PTjmeXfP6vHZrnlh6o0RKaUNkcSQUBth1lzmOqs8surZDTlptHQP80_Ho5MmyqlOSeHPqEfHaUEzZYfN0"

@app.route('/')
def generator():  # put application's code here
    token = request.args.get("token")
    if token != "RequestBody":
        return "token is valid."
    message_id = request.args.get("message_id")
    print(message_id)
    text = request.args.get("text")
    res = generator_image(text)
    src = res["data"]["artworks"][0]["outputs"]["value"]
    print(src)

    r = requests.get(src)

    image_name = text[0:5] + '.jpg'

    with open(image_name, 'wb') as f:
        f.write(r.content)

    # 获取token
    token = query_token()

    # 上传图片
    image_key = upload_image(image_name, token)

    send_image_src({
        "messageId": message_id,
        "imgKey": image_key,
        "content": text
    })

    # 回复消息
    # reply_message(message_id, image_key, token)

    return "success."


@app.route('/ping')
def ping():
    return "pong."


def send_image_src(src):
    conn = http.client.HTTPConnection("sh.countrystar.top", 8084)
    payload = json.dumps(src)
    headers = {
        'Content-Type': 'application/json'
    }
    conn.request("POST", "/crm/poster", payload, headers)
    res = conn.getresponse()
    data = res.read()
    print(data.decode("utf-8"))

def generator_image(text):
    conn = http.client.HTTPSConnection("bytegen.bytedance.net")
    payload = json.dumps({
        "configs": [
            {
                "name": "",
                "internal_name": "output_size",
                "type": "int",
                "value": 1
            },
            {
                "name": "width",
                "internal_name": "width",
                "type": "int",
                "value": 512
            },
            {
                "name": "height",
                "internal_name": "height",
                "type": "int",
                "value": 512
            },
            {
                "name": "seed",
                "internal_name": "seed",
                "type": "int",
                "value": "-1"
            },
            {
                "name": "scale",
                "type": "float",
                "value": 5.5
            },
            {
                "name": "ddim_steps",
                "type": "int",
                "value": 25
            }
        ],
        "inputs": [
            {
                "name": "img",
                "type": "uri",
                "value": "http://tosv.byted.org/obj/iccv-platform-bytegen-tos/%E9%80%9A%E7%94%A8%E9%A3%8E%E6%A0%BC.png"
            },
            {
                "name": "prompt",
                "internal_name": "prompt",
                "type": "string",
                "value": text
            }
        ],
        "demo_id": "1697146389921222",
        "input_schemas": [
            {
                "name": "prompt",
                "label": "创意描述(Prompt)",
                "tips": "用于生成图像的提示词",
                "internal_name": "prompt",
                "type": "string",
                "format": "prompt_input_box",
                "is_async": 0
            }
        ],
        "output_schemas": []
    })
    headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'Origin': 'https://byteartist.bytedance.net',
        'Referer': 'https://byteartist.bytedance.net/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
        'X-Jwt-Token': jwt,
        'sec-ch-ua': '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"'
    }
    conn.request("POST", "/aigc_control/artworks", payload, headers)
    res = conn.getresponse()
    data = res.read().decode("utf-8")
    print(data)
    r = json.loads(data)
    req_id = r["data"]["queue"]["req_id"]
    print(req_id)
    res = {
        "data": {
            "is_async": 1
        }
    }
    while res["data"]["is_async"] == 1:
        res = json.loads(query_image(req_id))
        time.sleep(10)
        if "artworks" in res["data"].keys():
            res["data"]["is_async"] = 0
        print(res)
    return res


def query_image(req_id):
    conn = http.client.HTTPSConnection("bytegen.bytedance.net")
    payload = ''
    headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Connection': 'keep-alive',
        'Origin': 'https://byteartist.bytedance.net',
        'Referer': 'https://byteartist.bytedance.net/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
        'X-Jwt-Token': jwt,
        'sec-ch-ua': '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"'
    }
    conn.request("GET", "/aigc_control/demos/1697146389921222/reqs/" + str(req_id), payload, headers)
    res = conn.getresponse()
    data = res.read()
    print(data.decode("utf-8"))
    return data


def query_token():
    conn = http.client.HTTPSConnection("open.feishu.cn")
    payload = json.dumps({
        "app_id": "cli_a36040ee80e4900b",
        "app_secret": "zFrfkoK7QX3eOEFnjJpOfcul0KMSPMnD"
    })
    headers = {
        'Content-Type': 'application/json'
    }
    conn.request("POST", "/open-apis/auth/v3/tenant_access_token/internal/", payload, headers)
    res = conn.getresponse()
    data = json.loads(res.read())
    return data["tenant_access_token"]


def upload_image(file, token):
    url = "https://open.feishu.cn/open-apis/im/v1/images"
    form = {'image_type': 'message',
            'image': (open(file, 'rb'))}  # 需要替换具体的path
    multi_form = MultipartEncoder(form)

    headers = {'Authorization': 'Bearer ' + token, 'Content-Type': multi_form.content_type}

    response = requests.request("POST", url, headers=headers, data=multi_form)
    print(response.headers['X-Tt-Logid'])  # for debug or oncall
    print(response.content)  # Print Response
    data = json.loads(response.content)
    return data["data"]["image_key"]


def reply_message(message_id, image_key, token):
    conn = http.client.HTTPSConnection("open.feishu.cn")
    payload = "{\n\t\"receive_id\": \"oc_xxx\",\n\t\"content\": \"{\\\"image_key\\\": \\\"" + image_key + "\\\"}\",\n\t\"msg_type\": \"image\"\n}"
    headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + token,
    }
    conn.request("POST", "/open-apis/im/v1/messages/" + message_id + "/reply", payload, headers)
    res = conn.getresponse()
    data = res.read()
    print(data.decode("utf-8"))


if __name__ == '__main__':
    app.run()
