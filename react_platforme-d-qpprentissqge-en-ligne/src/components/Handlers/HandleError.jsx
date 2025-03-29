export default function HandleError({errors,name}){
    return <>
        {errors[name] && (<p className="text-red-500 font-semibold">{errors[name][0]}</p>)}
    </>
}