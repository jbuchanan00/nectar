import type { PoolClient } from "pg";
import type { Role } from "../../../../baseTypes";


export default async function getRoleId(db: PoolClient, role: Role): Promise<number> {
    return await db.query(`SELECT id FROM role WHERE role_name=$1`, [role]).then(res => {
        console.log(role, res.rows)
        return parseInt(res.rows[0].id)
    })
}