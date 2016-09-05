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
			},
			item:{
				width:'default',
				height:'default',
				hover:'true',
			},
			btn:{
				width:'default',
				height:'default',
			}
		},
		createPicker:function(){			
			$.extend(true,this.defaultOptions, this.customOptions);			
			console.log(this.defaultOptions);
			
			_this=this;
			this.btnShell=document.createElement('div');
			this.btnShell.setAttribute('class','bs-style-shell');
			this.btnShell.innerHTML='<div class="color-selected-div"></div>';
			let selectedDiv=this.btnShell.getElementsByClassName('color-selected-div')[0];			
			let itemsDiv=document.createElement('div');
			itemsDiv.setAttribute('class','color-items-div');
			itemsDiv.style.display='none';
			this.element.appendChild(this.btnShell);
			this.element.appendChild(itemsDiv);
			this.applyOptions(itemsDiv,this.defaultOptions.box,'box');			
			this.applyOptions(this.btnShell,this.defaultOptions.btn,'btn');
			this.btnShell.addEventListener('click',function(){
				itemsDiv.style.display=(itemsDiv.style.display=='inline-block'?'none':'inline-block');
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
					itemsDiv.style.display='none';
				}
				itemsDiv.appendChild(itemSpan);
				if(i==0){
					selectedDiv.style.backgroundColor=this.colorArray[i];
					selectedDiv.setAttribute('item-selected',this.colorArray[i]);
				}
			}			
			document.addEventListener('click',_this.hideitemsByClick);			
			return this.element;
		},
		applyOptions:function(ele,opt,name){
			for(prop in opt){
				$(ele).addClass(name+'-'+prop+'-'+opt[prop]);
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
		var colorPicker=new ColorPicker(this[0],colorArray,items);
		colorPicker.createPicker();
		return colorPicker;
	}
	// $.fn.getColorPicked=function(){
	// 	return this.getValue();
	// }

})(jQuery, window, document);

