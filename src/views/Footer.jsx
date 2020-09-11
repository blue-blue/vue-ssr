import '../assets/styles/foot.scss'
export default {
  data() {
    return {
      author: 'richu'
    }
  },
  render() {
    return (
      <div class="foot">
        <span>Power by {this.author}</span>
      </div>
    )
  }
}
