/*! HABmin 2014-06-20 */
Ext.define("Ext.ux.window.Notification",{extend:"Ext.window.Window",alias:"widget.uxNotification",cls:"ux-notification-window",autoClose:!0,autoHeight:!0,plain:!1,draggable:!1,shadow:!1,focus:Ext.emptyFn,manager:null,useXAxis:!1,position:"br",spacing:6,paddingX:30,paddingY:10,slideInAnimation:"easeIn",slideBackAnimation:"bounceOut",slideInDuration:1500,slideBackDuration:1e3,hideDuration:500,autoCloseDelay:7e3,stickOnClick:!0,stickWhileHover:!0,isHiding:!1,isFading:!1,destroyAfterHide:!1,closeOnMouseOut:!1,xPos:0,yPos:0,statics:{defaultManager:{el:null}},initComponent:function(){var a=this;Ext.isDefined(a.corner)&&(a.position=a.corner),Ext.isDefined(a.slideDownAnimation)&&(a.slideBackAnimation=a.slideDownAnimation),Ext.isDefined(a.autoDestroyDelay)&&(a.autoCloseDelay=a.autoDestroyDelay),Ext.isDefined(a.autoHideDelay)&&(a.autoCloseDelay=a.autoHideDelay),Ext.isDefined(a.autoHide)&&(a.autoClose=a.autoHide),Ext.isDefined(a.slideInDelay)&&(a.slideInDuration=a.slideInDelay),Ext.isDefined(a.slideDownDelay)&&(a.slideBackDuration=a.slideDownDelay),Ext.isDefined(a.fadeDelay)&&(a.hideDuration=a.fadeDelay),a.position=a.position.replace(/c/,""),a.updateAlignment(a.position),a.setManager(a.manager),a.callParent(arguments)},onRender:function(){var a=this;a.callParent(arguments),a.el.hover(function(){a.mouseIsOver=!0},function(){a.mouseIsOver=!1,a.closeOnMouseOut&&(a.closeOnMouseOut=!1,a.close())},a)},updateAlignment:function(a){var b=this;switch(a){case"br":b.paddingFactorX=-1,b.paddingFactorY=-1,b.siblingAlignment="br-br",b.managerAlignment=b.useXAxis?"bl-br":"tr-br";break;case"bl":b.paddingFactorX=1,b.paddingFactorY=-1,b.siblingAlignment="bl-bl",b.managerAlignment=b.useXAxis?"br-bl":"tl-bl";break;case"tr":b.paddingFactorX=-1,b.paddingFactorY=1,b.siblingAlignment="tr-tr",b.managerAlignment=b.useXAxis?"tl-tr":"br-tr";break;case"tl":b.paddingFactorX=1,b.paddingFactorY=1,b.siblingAlignment="tl-tl",b.managerAlignment=b.useXAxis?"tr-tl":"bl-tl";break;case"b":b.paddingFactorX=0,b.paddingFactorY=-1,b.siblingAlignment="b-b",b.useXAxis=0,b.managerAlignment="t-b";break;case"t":b.paddingFactorX=0,b.paddingFactorY=1,b.siblingAlignment="t-t",b.useXAxis=0,b.managerAlignment="b-t";break;case"l":b.paddingFactorX=1,b.paddingFactorY=0,b.siblingAlignment="l-l",b.useXAxis=1,b.managerAlignment="r-l";break;case"r":b.paddingFactorX=-1,b.paddingFactorY=0,b.siblingAlignment="r-r",b.useXAxis=1,b.managerAlignment="l-r"}},getXposAlignedToManager:function(){var a=this,b=0;if(a.manager&&a.manager.el&&a.manager.el.dom){if(!a.useXAxis)return a.el.getLeft();"br"==a.position||"tr"==a.position||"r"==a.position?(b+=a.manager.el.getAnchorXY("r")[0],b-=a.el.getWidth()+a.paddingX):(b+=a.manager.el.getAnchorXY("l")[0],b+=a.paddingX)}return b},getYposAlignedToManager:function(){var a=this,b=0;if(a.manager&&a.manager.el&&a.manager.el.dom){if(a.useXAxis)return a.el.getTop();"br"==a.position||"bl"==a.position||"b"==a.position?(b+=a.manager.el.getAnchorXY("b")[1],b-=a.el.getHeight()+a.paddingY):(b+=a.manager.el.getAnchorXY("t")[1],b+=a.paddingY)}return b},getXposAlignedToSibling:function(a){var b=this;return b.useXAxis?"tl"==b.position||"bl"==b.position||"l"==b.position?a.xPos+a.el.getWidth()+a.spacing:a.xPos-b.el.getWidth()-b.spacing:b.el.getLeft()},getYposAlignedToSibling:function(a){var b=this;return b.useXAxis?b.el.getTop():"tr"==b.position||"tl"==b.position||"t"==b.position?a.yPos+a.el.getHeight()+a.spacing:a.yPos-b.el.getHeight()-a.spacing},getNotifications:function(a){var b=this;return b.manager.notifications[a]||(b.manager.notifications[a]=[]),b.manager.notifications[a]},setManager:function(a){var b=this;b.manager=a,"string"==typeof b.manager&&(b.manager=Ext.getCmp(b.manager)),b.manager||(b.manager=b.statics().defaultManager,b.manager.el||(b.manager.el=Ext.getBody())),"undefined"==typeof b.manager.notifications&&(b.manager.notifications={})},beforeShow:function(){var a=this;a.stickOnClick&&a.body&&a.body.dom&&Ext.fly(a.body.dom).on("click",function(){a.cancelAutoClose(),a.addCls("notification-fixed")},a),a.autoClose&&(a.task=new Ext.util.DelayedTask(a.doAutoClose,a),a.task.delay(a.autoCloseDelay)),a.el.setX(-1e4),a.el.setOpacity(1)},afterShow:function(){var a=this;a.callParent(arguments);var b=a.getNotifications(a.managerAlignment);b.length?(a.el.alignTo(b[b.length-1].el,a.siblingAlignment,[0,0]),a.xPos=a.getXposAlignedToSibling(b[b.length-1]),a.yPos=a.getYposAlignedToSibling(b[b.length-1])):(a.el.alignTo(a.manager.el,a.managerAlignment,[a.paddingX*a.paddingFactorX,a.paddingY*a.paddingFactorY],!1),a.xPos=a.getXposAlignedToManager(),a.yPos=a.getYposAlignedToManager()),Ext.Array.include(b,a),a.el.animate({from:{x:a.el.getX(),y:a.el.getY()},to:{x:a.xPos,y:a.yPos,opacity:1},easing:a.slideInAnimation,duration:a.slideInDuration,dynamic:!0})},slideBack:function(){var a=this,b=a.getNotifications(a.managerAlignment),c=Ext.Array.indexOf(b,a);!a.isHiding&&a.el&&a.manager&&a.manager.el&&a.manager.el.dom&&a.manager.el.isVisible()&&(c?(a.xPos=a.getXposAlignedToSibling(b[c-1]),a.yPos=a.getYposAlignedToSibling(b[c-1])):(a.xPos=a.getXposAlignedToManager(),a.yPos=a.getYposAlignedToManager()),a.stopAnimation(),a.el.animate({to:{x:a.xPos,y:a.yPos},easing:a.slideBackAnimation,duration:a.slideBackDuration,dynamic:!0}))},cancelAutoClose:function(){var a=this;a.autoClose&&a.task.cancel()},doAutoClose:function(){var a=this;a.stickWhileHover&&a.mouseIsOver?a.closeOnMouseOut=!0:a.close()},removeFromManager:function(){var a=this;if(a.manager){var b=a.getNotifications(a.managerAlignment),c=Ext.Array.indexOf(b,a);if(-1!=c)for(Ext.Array.erase(b,c,1);c<b.length;c++)b[c].slideBack()}},hide:function(){var a=this;return a.isHiding?a.isFading||(a.callParent(arguments),a.isHiding=!1):(a.isHiding=!0,a.isFading=!0,a.cancelAutoClose(),a.el&&a.el.fadeOut({opacity:0,easing:"easeIn",duration:a.hideDuration,remove:a.destroyAfterHide,listeners:{afteranimate:function(){a.isFading=!1,a.removeCls("notification-fixed"),a.removeFromManager(),a.hide(a.animateTarget,a.doClose,a)}}})),a},destroy:function(){var a=this;a.hidden?a.callParent(arguments):(a.destroyAfterHide=!0,a.hide(a.animateTarget,a.doClose,a))}});