export default function (context){
    console.log('2');
    
    if(!context.store.getters.isAuth){
        context.redirect('/admin/auth')
    }
}