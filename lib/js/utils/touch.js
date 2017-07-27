export default function(){
        var LSwiperMaker = function(o){ 
            var that = this;
            this.config = o;
            this.control = false;
            this.sPos = {};
            this.mPos = {};
            this.dire;
            this.x=0;
     
            // this.config.bind.addEventListener('touchstart', function(){ return that.start(); } ,false);
            // 这样不对的，event对象只在事件发生的过程中才有效;
            this.config.bind.addEventListener('touchstart', function(e){ return that.start(e); } ,false);
            this.config.bind.addEventListener('touchmove', function(e){ return that.move(e); } ,false);
            this.config.bind.addEventListener('touchend', function(e){ return that.end(e); } ,false);
 
        }
 
        LSwiperMaker.prototype.start = function(e){
             
             var point = e.touches ? e.touches[0] : e;
             this.sPos.x = point.screenX;
             this.sPos.y = point.screenY;
            return this.start()
 	
        }
        LSwiperMaker.prototype.move = function(e){  
 
            var point = e.touches ? e.touches[0] : e;
            this.control = true;
            this.mPos.x = point.screenX;
            this.mPos.y = point.screenY;
        }
        LSwiperMaker.prototype.end = function(e){
            this.config.dire_h  && (!this.control ? this.dire = null : this.mPos.x > this.sPos.x ? this.dire = 'R' : this.dire = 'L')
            this.config.dire_h  || (!this.control ? this.dire = null : this.mPos.y > this.sPos.y ? this.dire = '500' : this.dire = '-500')
            this.config.dire_h  || (!this.control ? this.dire = null : this.mPos.y > this.sPos.y ? this.x = this.x+500 : this.x = this.x-500)
            this.x>0? this.x=0: this.x
            this.x<-1000? this.x=-1000:this.x
            this.control = false;
            this.config.backfn(this);
        }
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);// 禁止微信touchmove冲突
        return new LSwiperMaker;
}