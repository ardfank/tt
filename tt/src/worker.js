// src/worker.js
import index from "./index.html";
import ss from "./ss.html";
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
function getSearchOrHashBased(url) {
  if(!url) url = location.href;
  var question = url.indexOf("?");
  var hash = url.indexOf("#");
  if(hash==-1 && question==-1) return {};
  if(hash==-1) hash = url.length;
  return question==-1 || hash==question+1
    ? url.substring(hash)
    : url.substring(question+1, hash);
}

function getJsonFromUrl(query) {
  var result = {};
  query.split("&").forEach(function(part) {
    if(!part) return;
    part = part.split("+").join(" "); // + to space, regexp-free version
    var eq = part.indexOf("=");
    var key = eq>-1 ? part.substr(0,eq) : part;
    var val = eq>-1 ? decodeURIComponent(part.substr(eq+1)) : "";
    var from = key.indexOf("[");
    if(from==-1) result[decodeURIComponent(key)] = val;
    else {
      var to = key.indexOf("]",from);
      var index = decodeURIComponent(key.substring(from+1,to));
      key = decodeURIComponent(key.substring(0,from));
      if(!result[key]) result[key] = [];
      if(!index) result[key].push(val);
      else result[key][index] = val;
    }
  });
  return result;
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
		let ble=await bl.blob();
        // console.log(await bl);
		return new Response(await ble, init);
      }
    }
    const url = new URL(request.url);
    if (url.pathname === "/ff.webmanifest") {
		let man='{\
			"name": "Tiktok Video Downloader - Network Reverse",\
			"short_name": "TT - Network Reverse",\
			"description": "Tiktok Video Downloader - Network Reverse. Download Video from Tiktok without watermark with many different format",\
			"icons": [\
				{\
				"src": "https://cdn.networkreverse.com/tt/pocut16.png",\
				"sizes": "16x16",\
				"type": "image/png"\
				},\
				{\
				"src": "https://cdn.networkreverse.com/tt/pocut.png",\
				"sizes": "128x128",\
				"type": "image/png"\
				},\
				{\
				"src": "https://cdn.networkreverse.com/tt/pocut256.png",\
				"sizes": "256x256",\
				"type": "image/png"\
				}\
			],\
			"start_url": "/",\
			"display": "minimal-ui",\
			"theme_color": "#B12A34",\
			"background_color": "#B12A34"\
			}';
		return new Response(man, {
			headers: {
				"content-type": "application/manifest+json; charset=utf-8",
			},
		});
	}
    if (url.pathname === "/robots.txt") {
		let man='User-agent: Mediapartners-Google\n\
Disallow: \n\
\n\
User-agent: *\n\
Disallow: /search\n\
Allow: /';
		return new Response(man, {
			headers: {
				"content-type": "text/plain; charset=UTF-8",
			},
		});
	}
	if (url.pathname === "/fed") {
		const fed = require('./feed.js');
		let query=getSearchOrHashBased(request.url);
		console.log(query);
		if(query.length>1){
			query=getJsonFromUrl(query);
			let fedH="";
			await fed.userf(query.api,(g)=>{
				fedH=g;
			})
			return new Response(fedH, {
				headers: {
					"content-type": "application/json; charset=UTF-8",
				},
			});
		}
	}
	let ttl="Tiktok Video Downloader - Network Reverse";
	let mdes="Tiktok Video Downloader - Network Reverse. Download and preview Video from Tiktok without watermark with many different format, search keyword, user search";
	let mkey="tiktok downloader,download tiktok without watermark,download video tiktok, download tiktok, free tiktok downloader";
	let mimg="https://cdn.networkreverse.com/logo.png";
	let query=getSearchOrHashBased(request.url);
	if(query.length>1){
		query=getJsonFromUrl(query);
		let idv=query.q.match(/https:\/\/www.tiktok.com\/(.*)\/video\/(\d+)/);
		if(query.q.includes('user:')){
			ttl=query.q.replace('user:','')+" - User video search - Network Reverse";
			mdes=ttl+". Download and preview Video from Tiktok without watermark with many different format, search keyword, user search";
			mkey=ttl.replace(/ /g,",")+",tiktok downloader,download tiktok without watermark,download video tiktok, download tiktok, free tiktok downloader";
		}else if(idv!==null && idv[2]!==null){
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
				res = await fetch("https://" + pita[0] + "/aweme/v1/feed/?iid=" + pita[1] + "&device_id=7318517321748022790&channel=googleplay&app_name=musical_ly&version_code=300904&device_platform=android&device_type=ASUS_Z01QD&os_version=9&aweme_id=" + idv[2]);
				try {
				jres = await res.json();
				if (jres.aweme_list[0].aweme_id === idv[2]) {
					break;
				}
				} catch (e) {
				continue;
				}
			}
			ttl=(jres.aweme_list[0].desc==null||jres.aweme_list[0].desc=="")?"No Title":jres.aweme_list[0].desc;
			ttl=jres.aweme_list[0].author.unique_id+" - "+ttl+" Tiktok Video Downloader - Network Reverse";
			mdes=ttl+". Download and preview Video from Tiktok without watermark with many different format, search keyword, user search";
			mkey=ttl.replace(/ /g,",")+",tiktok downloader,download tiktok without watermark,download video tiktok, download tiktok, free tiktok downloader";
			mimg=(jres.aweme_list[0].video.cover.url_list[0]!==undefined)?jres.aweme_list[0].video.cover.url_list[0]:mimg;
		}else{
			ttl=query.q+" - video search - Tiktok Video Downloader - Network Reverse";
			mdes=ttl+". Download and preview Video from Tiktok without watermark with many different format, search keyword, user search";
			mkey=ttl.replace(/ /g,",")+",tiktok downloader,download tiktok without watermark,download video tiktok, download tiktok, free tiktok downloader";
		}
	}
	let nih="<!DOCTYPE HTML>\
		<html>\
		<head>\
		<meta name='viewport' content='width=device-width, initial-scale=1'>\
		<meta content='text/html;charset=utf-8' http-equiv='Content-Type'>\
		<meta content='utf-8' http-equiv='encoding'>\
		<meta content='"+mkey+"' name='keywords' />\
		<meta content='"+ttl+"' name='twitter:title' />\
		<meta content='website' property='og:type' />\
		<link href='"+request.url+"' rel='canonical' />\
		<meta content='"+mdes+"' name='description' />\
		<meta content='"+request.url+"' property='og:url' />\
		<meta content='"+ttl+"' property='og:title' />\
		<meta content='"+mdes+"' property='og:description' />\
		<meta content='en_US' property='og:locale' />\
		<meta content='Entaah Laah' name='author' />\
		<meta content='439353449473051' property='fb:app_id' />\
		<meta content='1116888916' property='fb:admins' />\
		<meta content='871DA67EF97FB6DCD35CADB10CA82392' name='msvalidate.01' />\
		<meta content='632a7a0aa06f3805' name='yandex-verification' />\
		<meta content='45d6554c365a341f86ca' name='wot-verification' />\
		<meta content='summary_large_image' name='twitter:card' />\
		<meta content='@EntaahLaah' name='twitter:site' />\
		<meta content='@EntaahLaah' name='twitter:creator' />\
		<meta content='"+mdes+"' name='twitter:description' />\
		<meta property='og:image' content='"+mimg+"'>\
		<meta name='twitter:image' content='"+mimg+"'>\
		<link rel='manifest' href='ff.webmanifest' />\
		<meta name='theme-color' content='#B12A34'/>\
		<title>"+ttl+"</title>\
		<link rel='icon' type='image/x-icon' href='https://www.networkreverse.com/favicon.ico'>";
	let hin=nih+index+"<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js'></script>"+ss+"</body></html>";
    return new Response(hin, {
		headers: {
			"content-type": "text/html;charset=UTF-8",
		},
	});
  }
};
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
