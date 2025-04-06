export default function Tools() {
    return (
        <div className="page">
            <div className="items-row">
                <div className="input-part">
                    <div className="text-box">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis vitae velit eget viverra. Proin ut quam at libero porta ultricies id mollis augue. Donec non justo ex. Ut consectetur elit vel aliquet condimentum
                    </div>

                    <div className="text-box">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis vitae velit eget viverra. Proin ut quam at libero porta ultricies id mollis augue. Donec non justo ex. Ut consectetur elit vel aliquet condimentum
                    </div>
                    <br></br>
                    <form action="/submit" method="POST">
                        <div className="items-row">
                            <input type="file" id="resume" name="resume" required=""></input>
                        </div>
                        
                        <div className="items-row">
                            <button className="button-request-style" type="submit">Extract JSON</button>
                            <button className="button-request-style" type="submit">Evaluate Resume</button>
                        </div>
                    </form>
                </div>

                <div className="output-part">
                    <div className="text-box">
                        {`
\tLorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis vitae velit eget viverra. Proin ut quam at libero porta ultricies id mollis augue. Donec non justo ex. Ut consectetur elit vel aliquet condimentum. Fusce nunc diam, ultrices ac nisl vitae, tristique tempus dui. Fusce pellentesque, est id laoreet commodo, libero lorem luctus mauris, a tincidunt lectus dolor quis dolor. Phasellus eu pretium nisl. Aenean vestibulum, lacus ut ultrices rutrum, nulla magna egestas mauris, a imperdiet nibh turpis at est. Fusce quis nisl nec sapien semper hendrerit.

\tQuisque ante erat, fringilla et magna ac, gravida mattis eros. Vivamus imperdiet mollis consequat. In hac habitasse platea dictumst. In ante lacus, dignissim non pulvinar at, pellentesque a massa. Phasellus libero purus, efficitur et placerat eu, hendrerit ullamcorper leo. Duis eget interdum justo. In mi dui, fermentum ut ligula a, condimentum commodo dui. Cras sodales, lorem ut interdum venenatis, neque odio gravida lorem, in porttitor mi nisl vitae magna. Curabitur blandit est id consectetur fringilla. Vestibulum tempus vestibulum erat non pulvinar. Sed venenatis a libero nec tristique. Etiam enim nisl, congue vitae maximus quis, euismod eu quam. Aliquam iaculis convallis elit, ac blandit risus ultricies vitae. Sed libero risus, aliquet vel egestas vel, eleifend non elit. In condimentum porta velit at dapibus. Morbi pellentesque eleifend arcu quis aliquet.
                        `}
                    </div>
                </div>
            </div>
        </div>
    );
}