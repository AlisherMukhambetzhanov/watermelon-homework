<?php
class WatermelonController extends BaseController
{
    
    public function listAction()
    {
        

        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        // $arrQueryStringParams = explode('&', $arrQueryStringParams);
      
 
        if (strtoupper($requestMethod) == 'GET') {
            try {
                $watermelonModel = new WatermelonModel();
 
                $row = 1;
                $cell = 1;
                if (isset($arrQueryStringParams['row']) && isset($arrQueryStringParams['cell'])) {
                    $row = $arrQueryStringParams['row'];
                    $cell = $arrQueryStringParams['cell'];
                }
            
                $arrWatermelons = $watermelonModel->getWatermelons($row, $cell);
                $responseData = json_encode($arrWatermelons);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
 
        // send output
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }
}