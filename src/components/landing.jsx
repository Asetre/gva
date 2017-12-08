import React from 'react'

export default function Landing() {
    return(
        <div className="Landing">
            <a href="/posts">List</a>
            <form action="/posts/submit" method="post">
            <input type="text" placeholder="title" required/>
            <input type="email" placeholder="email" required/>
            <input type="text" placeholder="description" />
            <input type="submit" value="Add"/>
        </form>
    </div>
)
}
