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
			console.log(this.defaultOptions);
			
			_this=this;
			this.element.setAttribute('id',this.id);
			this.btnShell=document.createElement('div');
			this.btnShell.setAttribute('class','bs-style-shell');
			this.btnShell.innerHTML='<div class="color-selected-div"></div>';
			let selectedDiv=this.btnShell.getElementsByClassName('color-selected-div')[0];			
			 _this.itemsDiv=document.createElement('div');
			_this.itemsDiv.setAttribute('class','color-items-div');
			_this.itemsDiv.style.display='none';
			this.element.appendChild(this.btnShell);
			this.element.appendChild(_this.itemsDiv);
			// this.applyOptions(_this.itemsDiv,this.defaultOptions.box,'box');		
			this.applyOptions(_this.itemsDiv,this.defaultOptions.box,'box');	
			this.applyOptions(this.btnShell,this.defaultOptions.btn,'btn');
			this.btnShell.addEventListener('click',function(){
				// _this.itemsDiv.style.display=(_this.itemsDiv.style.display=='inline-block'?'none':'inline-block');
				let div=document.getElementById(_this.id).getElementsByClassName('color-items-div')[0];
				div.style.display=div.style.display=='inline-block'?'none':'inline-block';
				console.log(_this.id);
			})
			for(let i=0,m=this.colorArray.length;i<m;i++){
				let itemSpan=document.createElement('span');
				itemSpan.setAttribute('class','color-item');
				itemSpan.setAttribute('tag',this.colorArray[i]);			
				itemSpan.style.backgroundColor=this.colorArray[i];			
				itemSpan.style.color=this.colorArray[i];			
				this.applyOptions(itemSpan,this.defaultOptions.item,'item');
				itemSpan.onclick=function(e){
					selectedDiv.style.backgroundColor=this.getAttribute('tag');
					selectedDiv.setAttribute('item-selected',this.getAttribute('tag'));
					_this.itemsDiv.style.display='none';
				}
				_this.itemsDiv.appendChild(itemSpan);
				if(i==0){
					selectedDiv.style.backgroundColor=this.colorArray[i];
					selectedDiv.setAttribute('item-selected',this.colorArray[i]);
				}
			}			
			document.addEventListener('click',_this.hideitemsByClick);			
			return this.element;
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
			let selectedDiv=this.btnShell.getElementsByClassName('color-selected-div')[0];			
			return selectedDiv.getAttribute('item-selected');
		},
		setValue:function(color){
			let selectedDiv=this.btnShell.getElementsByClassName('color-selected-div')[0];
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
			this.element.getElementsByClassName('color-items-div')[0].style.display='none';
		}
	}

	$.fn.fastColorPicker=function(colorArray,items){
		let colorPicker=new ColorPicker(this[0],colorArray,items);
		colorPicker.id='color-picker'+Math.floor(Math.random()*9999999);
		colorPicker.createPicker();		
		return colorPicker;
	}
})(jQuery, window, document);

