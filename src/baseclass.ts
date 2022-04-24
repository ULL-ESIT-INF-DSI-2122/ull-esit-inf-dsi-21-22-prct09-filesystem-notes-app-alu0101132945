export abstract class BaseClass{
    protected list:number[]
    protected abstract reduce();
    protected filter(){}
    protected map(){}
    public run(){
        this.filter()
        this.map()
        this.reduce()
    }

}