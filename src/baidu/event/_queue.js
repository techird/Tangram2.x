/*
 * @author dron
 */

///import baidu.id;
///import baidu.event;
///import baidu.event._listener;

void function( base, be ){
    if( base._queue )return ;

    var I = baidu.id;
    var _queue = base._queue = {};
    var attaCache = _queue.attaCache = baidu.global( "eventQueueCache" );
    var _listener = base._listener;

    _queue.get = function( target, type, bindType, attachElements ){
        var id = I( target ), c;

        if( !attaCache[id] )
            attaCache[id] = {};

        c = attaCache[id];

        if( type ){
            if( !c[type] && bindType ){
                this.setupCall( target, type, bindType, c[ type ] = [], attachElements );
            }
            return c[type] || [];
        }else return c;
    };

    _queue.add = function( target, type, bindType, item, attachElements ){
        this.get( target, type, bindType, attachElements ).push( item );
    };

    _queue.remove = function( target, type, fn ){
        var arr, c;
        if( type ){
            var arr = this.get( target, type );
            if( fn ){
                for(var i = arr.length - 1; i >= 0; i --)
                    if( arr[i].orig == fn )
                        arr.splice( i, 1 );
            }else{
                arr.length = 0;
            }
        }else{
            var c = this.get( target );
            for(var i in c)
                c[i].length = 0;
        }
    };

    _queue.call = function( target, type, fnAry, e ){
        if( fnAry ){
            if( !fnAry.length )
                return ;

            var args = [].slice.call( arguments, 1 ), one = [];
                args.unshift( e = baidu.event( e || type ) );          
                e.type = type;

            if( !e.currentTarget )
                e.currentTarget = target;

            if( !e.target )
                e.target = target;

            for( var i = 0, r, l = fnAry.length; i < l; i ++ )
                if(r = fnAry[i]){
                    r.pkg.apply( target, args );
                    if( r.one )
                        one.unshift( i );
                }

            if( one.length )
                for(var i = 0, l = one.length; i < l; i ++)
                    this.remove( target, type, fnAry[i].fn );
                
        }else{
            fnAry = this.get( target, type );
            this.call( target, type, fnAry, e );
        }
    };

    _queue.setupCall = function(){
        var add = function( target, type, bindType, fnAry ){
            _listener.add( target, bindType, function( e ){
                _queue.call( target, type, fnAry, e );
            } );
        };
        return function( target, type, bindType, fnAry, attachElements ){
            if( !attachElements )
                add( target, type, bindType, fnAry );
            else{
                target = baidu.query( attachElements, target );
                for(var i = 0, l = target.length; i < l; i ++)
                    add( target[i], type, bindType, fnAry );
            }
        };
    }();

}( baidu.event, baidu.event );