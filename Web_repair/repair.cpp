#include <iostream>
#include <photo\photo.hpp>
#include <imgproc\imgproc.hpp>
#include <highgui\highgui.hpp>
#include <photo\photo.hpp>
#include <string>
#include <atlenc.h>
#include"repair.h"
#define DLLEXPORT extern "C" __declspec(dllexport)

using namespace std;
using namespace cv;

DLLEXPORT int __stdcall sum(int a, int b) {
	return a + b;
}
//全区域阈值处理+Mask膨胀处理
DLLEXPORT int __stdcall mainn(char* path) {
	Mat img = imread(path);
	if (img.empty())
	{
		cout << "empty";
		return -1;
	}
	else cout << 111;
	Mat imageGray;
	//转换为灰度图
	cvtColor(img, imageGray, COLOR_RGB2GRAY, 0);
	Mat imageMask = Mat(img.size(), CV_8UC1, Scalar::all(0));
	//通过阈值处理生成Mask
	threshold(imageGray, imageMask, 240, 255, THRESH_BINARY);
	Mat Kernel = getStructuringElement(MORPH_RECT, Size(3, 3));
	//对Mask膨胀处理，增加Mask面积
	dilate(imageMask, imageMask, Kernel);
	//图像修复
	inpaint(img, imageMask, img, 5, INPAINT_TELEA);
	imwrite("n.jpg", img);
	return 0;
}