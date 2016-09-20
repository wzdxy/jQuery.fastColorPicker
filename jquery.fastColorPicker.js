;(function($, window, document,undefined) {
	var ColorPicker=function(pickerElement,colorArray,options){
		this.element=pickerElement;
		this.colorArray=colorArray;		
		this.customOptions=options;
	}	

	ColorPicker.prototype={
		defaultOptions:{												//默认配置
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
		domArguments:{															//参数对应值
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
		createPicker:function(){											//创建选择器
			$.extend(true,this.defaultOptions, this.customOptions);			
			console.log('createPicker');
			 console.log(this.defaultOptions);
			 console.log(this.customOptions);
			//TODU 存在defaultOptions被覆盖问题
			let _this=this;
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
				// console.log('this');
				// console.log(this);
				// console.log('_this');
				// console.log(_this);
				_this.itemsDiv.style.display=(_this.itemsDiv.style.display=='inline-block'?'none':'inline-block');
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
		applyOptions:function (ele,opt,name) {											//根据配置修改选择器样式
			for(prop in opt){				
				if(!isNaN(opt[prop])){													//如果是数字则直接应用为CSS样式
					switch(prop){
						case 'width':
						case 'height':{
							$(ele).css(prop,opt[prop]);
							break;
						}
						case 'col':{
							let itemWidth;
							if(isNaN(this.defaultOptions.item.width)){
								let itemWidthIndex=_this.defaultOptions.item.width;
								itemWidth=this.domArguments['item']['width'][itemWidthIndex];
							}else{
								itemWidth=this.defaultOptions.item.width;								
							}
							// $(ele).css('width',opt[prop]*_this.domArguments['item']['width'][_this.defaultOptions.item.width]+10+'px');
							$(ele).css('width',opt[prop]*itemWidth+10);
							break;
						}
					}					
				}else{																	//如果是字符串则设为类名
					$(ele).addClass(name+'-'+prop+'-'+opt[prop]);	
				}
			}
		},
		getValue:function(){																		//读取选择的颜色值
			let selectedDiv=this.btnShell.getElementsByClassName('color-selected-div')[0];			
			return selectedDiv.getAttribute('item-selected');
		},
		setValue:function(color){																	//主动设置选中颜色		
			let selectedDiv=this.btnShell.getElementsByClassName('color-selected-div')[0];
			selectedDiv.setAttribute('item-selected',color);
			selectedDiv.style.backgroundColor=color;
		},
		hideitemsByClick:function(e,id){															//隐藏选项
			$('.color-items-div').hide();
			if(e.target.className=='color-selected-div'){
				// e.target.offsetParent.getElementsByClassName('color-items-div')[0].style.display='inline-block';
				$(e.target).parents('.fast-color-picker').children('.color-items-div').show();
			}
		},
		hideitems:function(){																		//隐藏选项
			this.element.getElementsByClassName('color-items-div')[0].style.display='none';
		}
	}

	$.fn.fastColorPicker=function(colorArray,items){
		let colorPicker=new ColorPicker(this[0],colorArray,items);
		console.log(colorPicker.defaultOptions);
		console.log(colorPicker.customOptions);
		colorPicker.id='color-picker'+Math.floor(Math.random()*9999999);
		colorPicker.createPicker();		
		return colorPicker;
	}
})(jQuery, window, document);

