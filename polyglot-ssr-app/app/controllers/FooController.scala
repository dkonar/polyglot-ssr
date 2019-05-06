package controllers

import javax.inject._
import org.graalvm.polyglot.Context
import play.api._
import play.api.mvc._

@Singleton
class FooController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  def index() = Action { implicit request: Request[AnyContent] =>
    val polyglot = Context.create()
    val text = polyglot.eval("js", "'Hello from JS'").asString()
    Ok(views.html.foo(text))
  }

}
