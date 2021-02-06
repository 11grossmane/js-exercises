window.addEventListener('DOMContentLoaded', () => {
    //importing jquery
    var script = document.createElement('script')
    script.src = 'https://code.jquery.com/jquery-3.4.1.min.js'
    script.type = 'text/javascript'
    document.getElementsByTagName('head')[0].appendChild(script)

    const buildDragEventFactory = () => {
        let id = 0
        return (node) => {
            node.id = 'img' + id
            console.log('node id', node.id)
            node.addEventListener('dragstart', (ev) => {
                ev.dataTransfer.setData('draggableImg', node.id)
                ev.dataTransfer.effectAllowed = 'copy'
            })
            node.draggable = true
            id++
        }
    }

    //adding drag event to first image
    const addDragEventToNode = buildDragEventFactory()
    let ogImage = document.getElementById('img')
    addDragEventToNode(ogImage)
    //creating a bunch of drop zones
    let container = document.getElementById('item')
    container.style += 'display:flex; flex-wrap:wrap;'
    for (let i = 0; i < 20; i++) {
        let dropZone = document.createElement('div')
        dropZone.ondragover = (ev) => {
            ev.preventDefault()
            ev.dataTransfer.dropEffect = 'copy'
        }
        dropZone.ondrop = (ev) => {
            ev.preventDefault()
            let dragId = ev.dataTransfer.getData('draggableImg')
            let el = document.getElementById(dragId)

            //copy and add drag event to subsequent images
            let copy = el.cloneNode(true)
            ev.target.appendChild(copy)
            addDragEventToNode(copy)
        }
        dropZone.style = 'border:1px solid gold; width:100px; height:100px;'
        container.appendChild(dropZone)
    }
    // let dropZone = document.getElementById('item')
    // dropZone.addEventListener('dragover', (ev) => {
    //     ev.preventDefault()
    //     ev.dataTransfer.dropEffect = 'move'
    // })
    // dropZone.addEventListener('drop', (ev) => {
    //     ev.preventDefault()
    //     const id = ev.dataTransfer.getData('draggableImg')
    //     ev.target.appendChild(document.getElementById(id))
    // })
})
