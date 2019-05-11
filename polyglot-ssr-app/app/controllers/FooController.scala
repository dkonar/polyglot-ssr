package controllers

import scala.concurrent.ExecutionContext
import javax.inject._
import org.graalvm.polyglot.Context
import org.graalvm.polyglot.proxy.ProxyExecutable
import play.api._
import play.api.mvc._
import play.api.libs.concurrent.CustomExecutionContext
import akka.actor.ActorSystem
import scala.concurrent.{Await, Future}
import scala.util.{Success, Failure, Try}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration._
trait MyExecutionContext extends ExecutionContext

class MyExecutionContextImpl @Inject()(system: ActorSystem)
  extends CustomExecutionContext(system, "my.executor")
  with MyExecutionContext

@Singleton
class FooController @Inject()(myExecutionContext: MyExecutionContext, cc: ControllerComponents) extends AbstractController(cc) {

  def index() = Action.async {
    def onFulfilled(myExecutionContext: MyExecutionContext): Future[String] = {
      val proxyExecutable = new ProxyExecutable {
        override def execute(text: String): Future[String] = {
          Future.successful {
            text
          }
        }
      }
    }

    val f: Future[String] = Future {
      val context = Context.create("js")
      val eval = context.eval("js", "async function() { return 'Hello World' }")
      val promise = eval.execute().invokeMember("then", onFulfilled(myExecutionContext))
      promise
    }(myExecutionContext)

    Try(Await.result(f, 1.second)) match {
      case Success(res: String) => Ok(views.html.foo(res))
      case Failure(e) => Ok(views.html.foo("Timed Out"))
    }
  }
}
