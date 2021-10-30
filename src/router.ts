import { Router } from "./deps.ts"
import clipboardRouter from './clipboard/router.ts'

const router = new Router()
router.use('/clipboard', clipboardRouter.routes())

export default router
