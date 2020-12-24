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
//ȫ������ֵ����+Mask���ʹ���
DLLEXPORT int __stdcall mainn(char* path) {
	Mat img = imread(path);
	if (img.empty())
	{
		cout << "empty";
		return -1;
	}
	else cout << 111;
	Mat imageGray;
	//ת��Ϊ�Ҷ�ͼ
	cvtColor(img, imageGray, COLOR_RGB2GRAY, 0);
	Mat imageMask = Mat(img.size(), CV_8UC1, Scalar::all(0));
	//ͨ����ֵ��������Mask
	threshold(imageGray, imageMask, 240, 255, THRESH_BINARY);
	Mat Kernel = getStructuringElement(MORPH_RECT, Size(3, 3));
	//��Mask���ʹ�������Mask���
	dilate(imageMask, imageMask, Kernel);
	//ͼ���޸�
	inpaint(img, imageMask, img, 5, INPAINT_TELEA);
	imwrite("n.jpg", img);
	return 0;
}