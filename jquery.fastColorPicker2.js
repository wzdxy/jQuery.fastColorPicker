;(function($, window, document,undefined) {
	var ColorPicker=function(pickerElement,colorArray,options){
		this.element=pickerElement;
		this.colorArray=colorArray;		
		this.customOptions=options;
	}	

	ColorPicker.prototype={
		defaultOptions:{
			box:{
				width:'default',
				height:'default',
				style:'true'
			},
			item:{
				width:'default',
				height:'default',
				hover:'true',
			},
			btn:{
				width:'default',
				height:'default',
				border:'true'
			}
		},
		domArguments:{
			box:{
				width:{default:100,large:130,small:70}				
			},
			item:{
				width:{default:30,large:60,small:20},
				height:{default:30,large:60,small:20}				
			},
			btn:{
				width:{default:100,large:130,small:50},
				height:{default:32,large:40,small:22}
			}
		},
		createPicker:function(){			
			$.extend(true,this.defaultOptions, this.customOptions);			
			
			
			_this=this;
			_this.btnShell=document.createElement('div');
			_this.btnShell.setAttribute('class','bs-style-shell');
			_this.btnShell.innerHTML='<div class="color-selected-div"></div>';
			let selectedDiv=_this.btnShell.getElementsByClassName('color-selected-div')[0];			
			_this.itemsDiv=document.createElement('div');
			_this.itemsDiv.setAttribute('class','color-items-div');
			_this.itemsDiv.style.display='none';
			_this.element.appendChild(_this.btnShell);
			_this.element.appendChild(_this.itemsDiv);
			// _this.applyOptions(_this.itemsDiv,this.defaultOptions.box,'box');		
			_this.applyOptions(_this.itemsDiv,_this.defaultOptions.box,'box');	
			_this.applyOptions(_this.btnShell,_this.defaultOptions.btn,'btn');
			_this.btnShell.addEventListener('click',function(){
				// _this.itemsDiv.style.display=(_this.itemsDiv.style.display=='inline-block'?'none':'inline-block');
				// _this.itemsDiv.style.display=(_this.itemsDiv.style.display=='inline-block'?'none':'inline-block');
				$(this).next('.color-items-div').css('display',$(this).nextUntil('.color-items-div').css('display')=='inline-block'?'none':'inline-block')
				console.log('this');
				console.log(this);
				console.log('_this');
				console.log(_this);
			})
			for(let i=0,m=_this.colorArray.length;i<m;i++){
				let itemSpan=document.createElement('span');
				itemSpan.setAttribute('class','color-item');
				itemSpan.setAttribute('tag',_this.colorArray[i]);			
				itemSpan.style.backgroundColor=_this.colorArray[i];			
				itemSpan.style.color=_this.colorArray[i];			
				_this.applyOptions(itemSpan,_this.defaultOptions.item,'item');
				itemSpan.onclick=function(e){
					selectedDiv.style.backgroundColor=this.getAttribute('tag');
					selectedDiv.setAttribute('item-selected',this.getAttribute('tag'));
					_this.itemsDiv.style.display='none';
				}
				_this.itemsDiv.appendChild(itemSpan);
				if(i==0){
					selectedDiv.style.backgroundColor=_this.colorArray[i];
					selectedDiv.setAttribute('item-selected',_this.colorArray[i]);
				}
			}			
			document.addEventListener('click',_this.hideitemsByClick);			
			console.log(this);
			return _this.element;
		},
		applyOptions:function (ele,opt,name) {			
			for(prop in opt){				
				if(!isNaN(opt[prop])){
					switch(prop){
						case 'width':
						case 'height':{
							$(ele).css(prop,opt[prop]);
							break;
						}
						case 'col':{
							let itemWidth;
							if(isNaN(_this.defaultOptions.item.width)){
								let itemWidthIndex=_this.defaultOptions.item.width;
								itemWidth=_this.domArguments['item']['width'][itemWidthIndex];
							}else{
								itemWidth=_this.defaultOptions.item.width;								
							}
							// $(ele).css('width',opt[prop]*_this.domArguments['item']['width'][_this.defaultOptions.item.width]+10+'px');
							$(ele).css('width',opt[prop]*itemWidth+10);
							break;
						}
					}					
				}else{
					$(ele).addClass(name+'-'+prop+'-'+opt[prop]);	
				}
			}
		},
		getValue:function(){
			let selectedDiv=_this.btnShell.getElementsByClassName('color-selected-div')[0];			
			return selectedDiv.getAttribute('item-selected');
		},
		setValue:function(color){
			let selectedDiv=_this.btnShell.getElementsByClassName('color-selected-div')[0];
			selectedDiv.setAttribute('item-selected',color);
			selectedDiv.style.backgroundColor=color;
		},
		hideitemsByClick:function(e){			
			$('.color-items-div').hide();			
			if(e.target.className=='color-selected-div'){
				e.target.offsetParent.getElementsByClassName('color-items-div')[0].style.display='inline-block';
			}
		},
		hideitems:function(){
			_this.element.getElementsByClassName('color-items-div')[0].style.display='none';
		}
	}

	$.fn.fastColorPicker=function(colorArray,items){
		let colorPicker=new ColorPicker(this[0],colorArray,items);
		colorPicker.id=this[0].getAttribute('id');
		colorPicker.createPicker();
		return colorPicker;
	}
})(jQuery, window, document);

