var CocoBlockly = CocoBlockly || {};

CocoBlockly.updater = {};
CocoBlockly.updater.files = [
  {name: "xmltoolbox", local: "", url: "https://cocomake7.github.io/CocoBlockly/cocoblockly/cocojs/toolbox.xml", type: "xmltoolbox"},
  {name: "cocogen", local: "cocojs/cocoblock/cocogen.js", url: "https://cocomake7.github.io/CocoBlockly/cocoblockly/cocojs/cocoblock/cocogen.js", type: "js"},
  {name: "cocoblock", local: "cocojs/cocoblock/cocoblock.js", url: "https://cocomake7.github.io/CocoBlockly/cocoblockly/cocojs/cocoblock/cocoblock.js", type: "js"}
]


var addJsScriptTag = function(script_str)
{
  var loader = document.createElement("script");
  loader.setAttribute("type", "text/javascript");
  loader.innerHTML = script_str;
  document.head.appendChild(loader);
}

var addJsScriptURLTag = function(url)
{
  var loader = document.createElement("script");
  loader.setAttribute("type", "text/javascript");
  loader.setAttribute("src", url);
  loader.innerHTML = url;
  document.head.appendChild(loader);
}

var addXMLScriptTag = function(id, xml_content)
{
  var loader = document.createElement("xml");
  loader.setAttribute("id", id);
  loader.innerHTML = xml_content;
  document.body.appendChild(loader);
}

CocoBlockly.updater.blockNeedUpdate = function(name, url, fun)
{
  if (typeof(conf.get(name)) === 'undefined')
  {
    fun(name, url)
  }else{
    CocoBlockly.updater.checkUpdateBlock(name, url, function(file){
    if(file.needupdate)
    {
      console.log(name, url, ' need update')
      fun(name, url)
    }
    })
  }
}

CocoBlockly.updater.updateBlock = function(file_name, url)
{
  CocoBlockly.updater.getUpdatedBlock(file_name, url, function(resp){
    console.log(file_name, ' updated')
    $.notify(file_name + ' updated')
    conf.set(file_name, resp)
  })
}

CocoBlockly.updater.updateNow = function()
{
    for (var i = 0; i < CocoBlockly.updater.files.length; ++i)
    {
      CocoBlockly.updater.blockNeedUpdate(CocoBlockly.updater.files[i].name, CocoBlockly.updater.files[i].url, CocoBlockly.updater.updateBlock)
    }
}


CocoBlockly.updater.checkUpdateBlock = function(file_name, file_url, fun)
{
  var dateReq = new XMLHttpRequest();
  dateReq.onreadystatechange = function() {
  if (dateReq.readyState === 4) {
      if (dateReq.status === 200) {
              // // we already have the cache
              if (dateReq.getResponseHeader("Last-Modified") == conf.get(file_name).time) {
                  try {
                    fun({needupdate: false})
                  } catch(e) { // if something goes wrong

                    fun({needupdate: true})

                  }
              } else{
                // we have not
                  fun({needupdate: true})
              } 
          } else 
            fun({needupdate: true})
      }
  }
  dateReq.open("HEAD", file_url  + "?" + new Date().getTime()  , true);
  dateReq.send(null);
}
CocoBlockly.updater.getUpdatedBlock = function(file_name, file_url, fun)
{
  var builtReq = new XMLHttpRequest();

  builtReq.addEventListener('progress', function(e) {

        var complete = Math.round((e.loaded / 2500000) * 150);      
      }, false);
  builtReq.onreadystatechange = function() {
      if (builtReq.readyState === 4) {
          if (builtReq.status === 200) {
              try{
                  // console.log(builtReq.responseText)
                  var resp = {content: builtReq.responseText, time: builtReq.getResponseHeader("Last-Modified"), url: file_url};
                  // conf.set(file_name, resp)
                  fun(resp)
              }catch(e){
                  console.log(e);
              }
          } else {
              // alert("An error occured while loading the app. Retry later or mail us at info@pingendo.com");
          }
      }
  };
  builtReq.open("GET", file_url + "?" + new Date().getTime() , true);
  builtReq.send(null);

}
