export default function (context){
    console.log('1');
        context.store.dispatch('initAuth', context.req);
    
}