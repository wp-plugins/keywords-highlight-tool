(function( $ )
{
    /*----------------------------------------*
    * modified by emptyhua@gmail.com
    * 使用 js 标记高亮关键词 by markcxz(markcxz@aol.com)
    * 参数说明:
    * obj: 对象, 要进行高亮显示的html标签节点.
    * hlWords: 字符串, 要进行高亮的关键词词, 使用 竖杠(|)或空格 分隔多个词 .
    * cssClass: 字符串, 定义关键词突出显示风格的css伪类.
    * 参考资料: javascript HTML DOM 高亮显示页面特定字词 By shawl.qiu
    \*----------------------------------------*/
    function MarkHighLight(obj,hlWords,cssClass,defaultColor){

        hlWords=AnalyzeHighLightWords(hlWords);
      
        if(obj==null || hlWords.length==0)
        return;
        if(cssClass)
        cssClass="highlight";
        MarkHighLightCore(obj,hlWords);
        log( 'highlight over~' );
      
        //------------执行高亮标记的核心方法----------------------------
        function MarkHighLightCore(obj,keyWords){
            var re=new RegExp(keyWords, "i");
              
            for(var i=0; i<obj.childNodes.length; i++){
              
                var childObj=obj.childNodes[i];
                if(childObj.nodeType==3){
                    if(childObj.data.search(re)==-1)continue;

                    log( 'find keyword "' + keyWords + '" at:' );
                    log( childObj );

                    var reResult=new RegExp("("+keyWords+")", "gi");
                    var objResult=childObj.ownerDocument.createElement("span");
                    objResult.innerHTML=childObj.data.replace(reResult,function($1)
                    {
                        return "<span class='" + cssClass + "' " + getHighlightStyle($1) + ">" + $1 + "</span>";
                    });                   

                    if(childObj.data==objResult.innerHTML) continue;
                        obj.replaceChild(objResult,childObj);                                    
                }else if(childObj.nodeType==1 && childObj.tagName.toLowerCase() != 'script' ){
                    MarkHighLightCore(childObj,keyWords);
                }
            }
        }      

        //----------分析关键词----------------------
        function AnalyzeHighLightWords(hlWords)
        {
            if(hlWords==null) return "";
            hlWords=hlWords.replace(/\s+/g,"|").replace(/\|+/g,"|");          
            hlWords=hlWords.replace(/(^\|*)|(\|*$)/g, "");
              
            if(hlWords.length==0) return "";
            var wordsArr=hlWords.split("|");
              
            if(wordsArr.length>1){
                var resultArr=BubbleSort(wordsArr);
                //var result="";
                return resultArr.join( '|' );
                /*for(var i=0;i<resultArr.length;i++){
                    result=result+"|"+resultArr[i];
                }              
                return result.replace(/(^\|*)|(\|*$)/g, "");
                */
            }else{
                return hlWords;
            }
        }  
      
        //-----利用冒泡排序法把长的关键词放前面-----  
        function BubbleSort(arr){      
            var temp, exchange;  
            for(var i=0;i<arr.length;i++){          
                exchange=false;              
                for(var j=arr.length-2;j>=i;j--){              
                if((arr[j+1].length)>(arr[j]).length){                  
                    temp=arr[j+1]; arr[j+1]=arr[j]; arr[j]=temp;
                    exchange=true;
                }
                }              
                if(!exchange)break;
            }
            return arr;          
        }
        
        function getHighlightStyle( key )
        {
            key = key.toLowerCase();
            if ( !defaultColor ) return '';
            var t = arguments.callee;
            if ( typeof t.index == 'undefined' )
            {
                t.index = {};
                var ws = hlWords.split( '|' );
                var k = 0;
                for ( var i = ws.length - 1; i > -1; i-- )
                {
                    t.index[ ws[ i ].toLowerCase() ] = k;
                    if ( k == 9 )
                    {
                        k = 0;
                    }
                    else
                    {
                        k ++;
                    }
                }
            }
             
            var color = [
                ['#FFFF66','#000'],
                ['#A0FFFF','#000'],
                ['#99FF99','#000'],
                ['#FF9999','#000'],
                ['#FF66FF','#000'],
                ['#880000','#fff'],
                ['#00AA00','#fff'],
                ['#886800','#fff'],
                ['#004699','#fff'],
                ['#990099','#fff']
            ];
            //log( 'color theme for ' + key + ':' );
            var theme = color[ t.index[ key ] ]; 
            //log( theme );
            return 'style="background-color:' + theme[ 0 ] + ';color:' + theme[ 1 ] + ';font-weight:bold;"';
        }    
	

    }
    //----------------end------------------------ 

	var debug = false;
	function log( str )
	{
		if ( debug && window.console && console.log )
		{
			console.log( str );
		}
	}

	function getQuery( key , url )
	{
		url = url || window.location.href;
		if ( url.indexOf( '#' ) !== -1 )
		    url = url.substring( 0 , url.indexOf( '#' ) );
		var rts = [],rt;
		var queryReg = new RegExp( '(^|\\?|&)' + key + '=([^&]*)(?=&|$|#)' , 'g' );
		while ( ( rt = queryReg.exec( url ) ) != null )
		{
			rts.push( rt[ 2 ] );
		}
		if ( rts.length == 0 ) return null;
		if ( rts.length == 1 ) return rts[ 0 ];
		return rts;
	}
    
    function getKeywords()
    {
        log( 'refer:' +  document.referrer );
		var url = document.referrer;
		var ks = null;
        var sites = [
            ['google', 'q'],
            ['bing.com', 'q'],
            ['youdao.com', 'lq'],
            ['baidu.com', 'wd'],
            ['yahoo', 'p']
        ];

        for ( var i = sites.length - 1; i > -1; i-- )
        {
            if ( url.indexOf( sites[ i ][ 0 ] ) === -1 ) continue;
            ks = sites[ i ][ 1 ];
            break;
        }

        ks = getQuery( ks, url );
        log( 'query:' + ks );
        return ks;
    }
    
   
    var highlight_class = 'keyword-highlight';
	$(function()
	{
	    var ks = getKeywords();	
        if ( !ks ) return;
        try
        {
            var dks = decodeURIComponent( ks );
            dks = dks.split( '+' );
            log( 'keywords decoded:' );
            log( dks );
            MarkHighLight( document.body, dks.join( '|' ), highlight_class, true );
        }
        catch( e )
        {
            log( 'gb2312? decode by php' );
            ks = ks.split( '+' );
            $.get( wpBlueKeywordsHighlightPath + '/decode_keywords.php?k[]=' + ks.join( '&k[]=' ) ,
                null,
                function( r )
                {
                    r = r.split( ':__blue__:' );
                    if ( r.length === 0 ) return;
                    log( 'keywords decoded:' );
                    log( r );
                    MarkHighLight( document.body, r.join( '|' ), highlight_class, true );//console.log( r );
                });
        }
	});
})( jQuery );
