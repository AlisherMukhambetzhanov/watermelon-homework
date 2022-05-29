<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
 
class WatermelonModel extends Database
{
    public function getWatermelons($row, $cell)
    {
        return $this->select("SELECT * FROM watermelons WHERE watermelons.row='{$row}' AND watermelons.cell = '{$cell}';");
    }
}