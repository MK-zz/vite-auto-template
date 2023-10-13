type PathInfo = {
    path:string,
    targetDir:string
    
}&NamingTypes

type PathData = PathInfo


type NamingTypes  = {
    oname?:StringOrStringFunction
    hname?:StringOrStringFunction
    uname?:StringOrStringFunction
    pcname?:StringOrStringFunction
    ccname?:StringOrStringFunction
}
type StringOrStringFunction = string|((originName:string) => string)
