अगर 100 posts आ गये तो 100 components render होंगे 😵

Solution:
npm install react-window
Use -> react-window

यह screen पर जितने दिख रहे हैं उतने ही render करेगा।
import { FixedSizeList as List } from "react-window";

<List
height={800}
itemCount={postData.length}
itemSize={300}
width={"100%"}

> {({ index, style }) => (

    <div style={style}>
      <Post post={postData[index]} />
    </div>

)}
</List>
