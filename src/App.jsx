import React, {Component} from 'react'


class App extends Component{
    constructor()
    {
        super();
        this.state = {
            url : []
        }
        this.observer = null;
        
    }
    
    ref = React.createRef();
   

    componentDidMount()
    {
        this.observer = new IntersectionObserver(([e]) =>{
        
        if (e.intersectionRatio>0)
        {
            this.getNewImage();     
        }},
        {
            threshold : 1
        });
        this.observer.observe(this.ref.current) ;
    }


    getNewImage()
    {
     const newimgurl="https://picsum.photos/200/300";           
    const arr = [...this.state.url,newimgurl]
    this.setState({url : arr});   
    }


    render()
    {
        return (
            <div>
            <h1>
                Infinite Scroll using IO
            </h1>
            <div>
             {
                this.state.url.map((url,index) =>
                {
                return (<div key={ index } newref={(input)=>{this.divitem=input}}>
                    <img src = { url }  style={{height:"800px",width:"100%" }} alt = "img not loaded"/>
                </div>)
                }
                )
            }
            </div>
            <footer ref={this.ref}>
                Loading
            </footer>
            </div>
        )
    }

}

export default App;