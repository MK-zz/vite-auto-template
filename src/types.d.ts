type PathInfo = {
    path: string;
    dir?: string[]; // 这是一个可选属性，因为有些对象没有它
    template?: string; // 这是一个示例，你可以根据实际情况来定义这个属性的类型
};

type PathData = PathInfo | string;