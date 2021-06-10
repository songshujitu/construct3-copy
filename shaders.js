self["C3_Shaders"] = {};
self["C3_Shaders"]["tint"] = {
	src: "varying mediump vec2 vTex;\nuniform lowp sampler2D samplerFront;\nuniform lowp vec3 tintColor;\nvoid main(void)\n{\nlowp vec4 front = texture2D(samplerFront, vTex);\ngl_FragColor = front * vec4(tintColor.r, tintColor.g, tintColor.b, 1.0);\n}",
	extendBoxHorizontal: 0,
	extendBoxVertical: 0,
	crossSampling: false,
	mustPreDraw: false,
	preservesOpaqueness: true,
	animated: false,
	parameters: [["tintColor",0,"color"]]
};
self["C3_Shaders"]["brightness"] = {
	src: "varying mediump vec2 vTex;\nuniform lowp sampler2D samplerFront;\nuniform lowp float brightness;\nvoid main(void)\n{\nlowp vec4 front = texture2D(samplerFront, vTex);\nlowp float a = front.a;\nif (a != 0.0)\nfront.rgb /= front.a;\nfront.rgb += (brightness - 1.0);\nfront.rgb *= a;\ngl_FragColor = front;\n}",
	extendBoxHorizontal: 0,
	extendBoxVertical: 0,
	crossSampling: false,
	mustPreDraw: false,
	preservesOpaqueness: true,
	animated: false,
	parameters: [["brightness",0,"percent"]]
};
self["C3_Shaders"]["replacecolor"] = {
	src: "varying mediump vec2 vTex;\nuniform lowp sampler2D samplerFront;\nuniform lowp vec3 sourceColor;\nuniform lowp vec3 destColor;\nuniform lowp float tolerance;\nvoid main(void)\n{\nlowp vec4 front = texture2D(samplerFront, vTex);\nlowp float a = front.a;\nif (a != 0.0)\nfront.rgb /= a;\nlowp float diff = length(front.rgb - sourceColor);\nif (diff <= tolerance)\n{\nfront.rgb = mix(front.rgb, destColor, 1.0 - diff / tolerance);\n}\nfront.rgb *= a;\ngl_FragColor = front;\n}",
	extendBoxHorizontal: 0,
	extendBoxVertical: 0,
	crossSampling: false,
	mustPreDraw: false,
	preservesOpaqueness: true,
	animated: false,
	parameters: [["sourceColor",0,"color"],["destColor",0,"color"],["tolerance",0,"percent"]]
};
self["C3_Shaders"]["overlay"] = {
	src: "precision mediump float;\nvarying mediump vec2 vTex;\nuniform lowp sampler2D samplerFront;\nuniform mediump vec2 srcStart;\nuniform mediump vec2 srcEnd;\nuniform lowp sampler2D samplerBack;\nuniform mediump vec2 destStart;\nuniform mediump vec2 destEnd;\nvoid main(void)\n{\nlowp vec4 front = texture2D(samplerFront, vTex);\nmediump vec2 tex = (vTex - srcStart) / (srcEnd - srcStart);\nlowp vec4 back = texture2D(samplerBack, mix(destStart, destEnd, tex));\nfront.r = back.r < 0.5 ? 2.0 * back.r * front.r : 2.0 * (front.r + back.r * front.a - back.r * front.r) - front.a;\nfront.g = back.g < 0.5 ? 2.0 * back.g * front.g : 2.0 * (front.g + back.g * front.a - back.g * front.g) - front.a;\nfront.b = back.b < 0.5 ? 2.0 * back.b * front.b : 2.0 * (front.b + back.b * front.a - back.b * front.b) - front.a;\nfront *= back.a;\ngl_FragColor = front;\n}",
	extendBoxHorizontal: 0,
	extendBoxVertical: 0,
	crossSampling: false,
	mustPreDraw: false,
	preservesOpaqueness: false,
	animated: false,
	parameters: []
};
self["C3_Shaders"]["warpobjectmask"] = {
	src: "#ifdef GL_FRAGMENT_PRECISION_HIGH\n#define highmedp highp\n#else\n#define highmedp mediump\n#endif\nvarying mediump vec2 vTex;\nuniform lowp sampler2D samplerFront;\nuniform mediump vec2 srcStart;\nuniform mediump vec2 srcEnd;\nuniform mediump vec2 srcOriginStart;\nuniform mediump vec2 srcOriginEnd;\nuniform lowp sampler2D samplerBack;\nuniform mediump vec2 destStart;\nuniform mediump vec2 destEnd;\nuniform highmedp float seconds;\nuniform mediump vec2 pixelSize;\nuniform mediump float layerScale;\nuniform mediump float freqX;\nuniform mediump float freqY;\nuniform mediump float ampX;\nuniform mediump float ampY;\nuniform mediump float speedX;\nuniform mediump float speedY;\nvoid main(void)\n{\nmediump float _2pi = 2.0 * 3.14159265359;\nlowp float fronta = texture2D(samplerFront, vTex).a;\nmediump vec2 srcSize = srcEnd - srcStart;\nmediump vec2 tex = ((vTex - srcStart) / srcSize);\nmediump vec2 srcOriginSize = srcOriginEnd - srcOriginStart;\nmediump vec2 n = ((vTex - srcOriginStart) / srcOriginSize);\nmediump vec2 p = mix(destStart, destEnd, tex);\np.x += cos(n.y * _2pi * freqY + seconds * speedY * _2pi) * ampY * pixelSize.x * layerScale * fronta;\np.y += sin(n.x * _2pi * freqX + seconds * speedX * _2pi) * ampX * pixelSize.y * layerScale * fronta;\np = clamp(p, min(destStart, destEnd), max(destStart, destEnd));\ngl_FragColor = texture2D(samplerBack, p);\n}",
	extendBoxHorizontal: 30,
	extendBoxVertical: 30,
	crossSampling: true,
	mustPreDraw: false,
	preservesOpaqueness: false,
	animated: true,
	parameters: [["freqX",0,"float"],["freqY",0,"float"],["ampX",0,"float"],["ampY",0,"float"],["speedX",0,"float"],["speedY",0,"float"]]
};
