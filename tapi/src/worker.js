// src/worker.js
import index from "./index.html";
async function readRequestBody(request) {
  const contentType = request.headers.get("content-type");
  if (contentType.includes("application/json")) {
    return JSON.stringify(await request.json());
  } else if (contentType.includes("application/text")) {
    return request.text();
  } else if (contentType.includes("text/html")) {
    return request.text();
  } else if (contentType.includes("form")) {
    const formData = await request.formData();
    const body = {};
    for (const entry of formData.entries()) {
      body[entry[0]] = entry[1];
    }
    return JSON.stringify(body);
  } else {
    return "a file";
  }
}
function check(array, key, value) {
  return array.some((object) => object[key] === value);
}
var worker_default = {
  /**
   * @param {Request} request
   * @param {ExecutionContext} ctx
   * @returns {Promise<Response>}
   */
  async fetch(request, env, ctx) {
    if (request.method === "POST") {
      let reqBody = await readRequestBody(request);
      let name = JSON.parse(reqBody);
      if (name.vid > 1) {
        let vid = name.vid;
        let res;
        let jres;
        let apit = [
          "api19-normal-c-useast1a.tiktokv.com:7355728856979392262",
          "api16-core-c-useast1a.tiktokv.com:7318518857994389254",
          "api16-core-c-useast1a.tiktokv.com:7355728856979392262",
          "api16-normal-c-alisg.tiktokv.com:7355728856979392262",
          "api16-normal-c-alisg.tiktokv.com:7318518857994389254",
          "api16-normal-c-useast1a.tiktokv.com:7318518857994389254",
          "api16-normal-c-useast1a.tiktokv.com:7355728856979392262",
          "api19-core-c-useast1a.tiktokv.com:7355728856979392262",
          "api19-core-c-useast1a.tiktokv.com:7318518857994389254",
          "api19-normal-c-alisg.tiktokv.com:7318518857994389254",
          "api19-normal-c-alisg.tiktokv.com:7355728856979392262",
          "api19-normal-c-useast1a.tiktokv.com:7318518857994389254",
          "api22-normal-c-alisg.tiktokv.com:7355728856979392262",
          "api22-normal-c-alisg.tiktokv.com:7318518857994389254",
          "api22-normal-c-useast1a.tiktokv.com:7318518857994389254",
          "api22-normal-c-useast1a.tiktokv.com:7355728856979392262",
          "api31-core-useast1a.tiktokv.com:7355728856979392262",
          "api31-core-useast1a.tiktokv.com:7318518857994389254",
          "api31-normal-useast1a.tiktokv.com:7355728856979392262",
          "api31-normal-useast1a.tiktokv.com:7318518857994389254"
        ];
        for (const g of apit) {
          let pita = g.split(":");
          res = await fetch("https://" + pita[0] + "/aweme/v1/feed/?iid=" + pita[1] + "&device_id=7318517321748022790&channel=googleplay&app_name=musical_ly&version_code=300904&device_platform=android&device_type=ASUS_Z01QD&os_version=9&aweme_id=" + vid);
          try {
            jres = await res.json();
            if (jres.aweme_list[0].aweme_id === vid) {
              break;
            }
          } catch (e) {
            continue;
          }
        }
        var init = {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json;charset=utf-8"
          }
        };
        let newR;
        let formats = [];
        jres.aweme_list.forEach((element) => {
          if (element.aweme_id === vid) {
            newR = {
              "id": element.aweme_id,
              "uploader": element.author.unique_id,
              "uploader_id": element.author.uid,
              "fulltitle": element.desc ?? "",
              "title": element.original_client_text ? element.original_client_text.markup_text : "",
              "view_count": element.statistics.play_count ?? 0,
              "timestamp": element.create_time ?? 1713330775,
              "bodydance_score": element.bodydance_score ?? 0,
              "cover": element.video.dynamic_cover.url_list[0] ?? "",
              "format": []
            };
            if (typeof element.video.download_addr !== "undefined") {
              element.video.download_addr.url_list.forEach((e) => {
                if (check(formats, "url", e) === false) {
                  let format = {
                    "url": e,
                    "format_note": "Wmarked",
                    "vcodec": "h264 Wmarked",
                    "format": element.video.download_addr.url_key,
                    "filesize": element.video.download_addr.data_size ?? 0,
                    "resolution": "~" + (element.video.play_addr.width ?? 0) + "x" + (element.video.play_addr.height ?? 0)
                  };
                  formats.push(format);
                }
              });
            }
            if (typeof element.video.misc_download_addrs !== "undefined") {
              let misc = JSON.parse(element.video.misc_download_addrs);
              misc.suffix_scene.url_list.forEach((e) => {
                if (check(formats, "url", e) === false) {
                  let format = {
                    "url": e,
                    "format_note": "MISC",
                    "vcodec": "h264 Wmarked",
                    "format": misc.suffix_scene.url_key,
                    "filesize": misc.suffix_scene.data_size ?? 0,
                    "resolution": "~" + (misc.suffix_scene.width ?? 0) + "x" + (misc.suffix_scene.height ?? 0)
                  };
                  formats.push(format);
                }
                ;
              });
            }
            if (typeof element.video.play_addr !== "undefined") {
              element.video.play_addr.url_list.forEach((e) => {
                if (check(formats, "url", e) === false) {
                  let format = {
                    "url": e,
                    "format_note": "Direct",
                    "format": element.video.play_addr.url_key,
                    "vcodec": "h264",
                    "filesize": element.video.play_addr.data_size ?? 0,
                    "resolution": (element.video.play_addr.width ?? 0) + "x" + (element.video.play_addr.height ?? 0)
                  };
                  formats.push(format);
                }
              });
            }
            if (typeof element.video.play_addr_h264 !== "undefined") {
              element.video.play_addr_h264.url_list.forEach((e) => {
                if (check(formats, "url", e) === false) {
                  let format = {
                    "url": e,
                    "format_note": "H264",
                    "vcodec": "h264",
                    "format": element.video.play_addr_h264.url_key,
                    "filesize": element.video.play_addr_h264.data_size ?? 0,
                    "resolution": "~" + (element.video.play_addr_h264.width ?? 0) + "x" + (element.video.play_addr_h264.height ?? 0)
                  };
                  formats.push(format);
                }
                ;
              });
            }
            if (typeof element.video.play_addr_bytevc1 !== "undefined") {
              element.video.play_addr_bytevc1.url_list.forEach((e) => {
                if (check(formats, "url", e) === false) {
                  let format = {
                    "url": e,
                    "format_note": "H265",
                    "vcodec": "h265",
                    "format": element.video.play_addr_bytevc1.url_key,
                    "filesize": element.video.play_addr_bytevc1.data_size ?? 0,
                    "resolution": "~" + (element.video.play_addr_bytevc1.width ?? 0) + "x" + (element.video.play_addr_bytevc1.height ?? 0)
                  };
                  formats.push(format);
                }
                ;
              });
            }
            if (typeof element.video.bit_rate !== "undefined") {
              element.video.bit_rate.forEach((f) => {
                f.play_addr.url_list.forEach((e) => {
                  if (check(formats, "url", e) === false) {
                    let format = {
                      "url": e,
                      "format_note": "Bitrate",
                      "vcodec": "h265",
                      "format": f.play_addr.url_key,
                      "filesize": f.play_addr.data_size ?? 0,
                      "resolution": (f.play_addr.width ?? 0) + "x" + (f.play_addr.height ?? 0)
                    };
                    formats.push(format);
                  }
                  ;
                });
              });
            }
          }
        });
        newR.format = formats;
        return new Response(JSON.stringify(newR), init);
      } else {
		  var init = {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "video/mp4"
          }
        };
		let link=decodeURIComponent(name.link);
		let bl=await fetch(link);
		// let ble=await bl.blob();
        // console.log(await bl);
		return new Response(await bl, init);
      }
    }
    return new Response(index, {
		headers: {
			"content-type": "text/html",
		},
	});
  }
};
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
