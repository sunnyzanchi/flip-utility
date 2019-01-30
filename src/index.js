import './styles.css'
import Flip from './Flip'

const items = document.querySelectorAll('li')
const flip = new Flip(items)

const clickHandler = item => () => {
  flip.run(() => {
    items.forEach(item => item.classList.remove('active'))
    item.classList.add('active')
  })
}

items.forEach(item => item.addEventListener('click', clickHandler(item)))
